
import excuteQuery from "../../../lib/db.js";
import { calcStringScores } from "../../../lib/ppi-utils.mjs";

// get PPI from database
export default async function (req, res) {
   // get the query string
   if (req.method == "GET") {
      const { gene, nodes } = req.query;
      const scorechannels = req.query.scorechannels.split(",");

      let queryInteractions = await excuteQuery({
         query: "SELECT DISTINCT string.protein1, string.protein2, string.nscore, string.fscore, string.pscore, string.ascore, string.escore, string.dscore, string.tscore, string.score FROM string_id_map AS map RIGHT JOIN string_db AS string ON map.string_id = string.protein1 WHERE map.preferred_name = ?",
         values: [gene],
      });

      queryInteractions = queryInteractions.map((interaction) => calcStringScores(interaction, scorechannels));

      queryInteractions.sort((protA, protB) => {
         if (protA.combinedScore <= protB.combinedScore) {
            return 1;
         } else if (protA.combinedScore > protB.combinedScore) {
            return -1;
         }
      });

      // save the STRING ID for the current query
      let QUERY_STRING_ID = null;

      try {
         QUERY_STRING_ID = queryInteractions[0].protein1;
      } catch (error) {
         if (error instanceof TypeError) {
            // protein not found in database
            return res.status(204).json({});
         }
      }

      // get the top N best interactions
      const topNInteractions = queryInteractions.slice(0, nodes);

      let nodeListStringId = [];
      nodeListStringId.push(QUERY_STRING_ID);
      topNInteractions.forEach((interaction) => nodeListStringId.push(interaction.protein2));
      const nodeListSqlQuery = "('" + nodeListStringId.join("','") + "')";

      // fetch expression record as well as gene names
      // can't use single quotes (') with values:[] props
      // probably something about how the record is being serialized
      const queryExpressionRecords = await excuteQuery({
         query: `(SELECT DISTINCT string.string_id, string.preferred_name, map.uniprot, human.structure, human.stage, human.tpm FROM string_id_map AS string RIGHT JOIN map_uniprot AS map ON string.preferred_name = map.gene RIGHT JOIN human_expression_devomics AS human ON string.preferred_name = human.human_gene WHERE string.string_id IN ${nodeListSqlQuery}) UNION (SELECT DISTINCT string.string_id, string.preferred_name, map.uniprot, mouse.structure, mouse.stage, mouse.tpm FROM string_id_map AS string RIGHT JOIN map_uniprot AS map ON string.preferred_name = map.gene RIGHT JOIN map_orthology AS ortho ON ortho.uniprot = string.uniprot_id RIGHT JOIN mgi_expression AS mouse ON mouse.mgi = ortho.mgi WHERE string.string_id IN ${nodeListSqlQuery})`,
      });

      // CONSTRUCT cytoscapeNodes OBJECT
      let geneNameCache = {};
      let cytoscapeNodesHashmap = {};
      let cytoscapeNodes = [];
      let structuresInStage = {};

      queryExpressionRecords.forEach((record) => {
         // if node previously added (found in geneNameCache)
         if (geneNameCache[record.string_id] !== undefined) {
            // get the idx of the protein inside the cytoscapeNodes object
            const cytoscapeNodeIdx = cytoscapeNodesHashmap[record.string_id];
            const stageToAddRecord = cytoscapeNodes[cytoscapeNodeIdx].data.expression[record.stage];

            // a record was previously added to this stage, so add data in this stage
            if (stageToAddRecord !== undefined) {
               const structureRecord = stageToAddRecord[record.structure];

               // a record was previously added to this structure, so add data in this structure
               if (structureRecord !== undefined) {
                  // overwrite the previous record if we get a higher one for this structure
                  // usually means the previous record was not RNA-Seq data (noted as 0.0 TPM)
                  // we prioritize displaying RNA-Seq data
                  if (structureRecord < record.tpm) {
                     cytoscapeNodes[cytoscapeNodeIdx].data.expression[record.stage][record.structure] = record.tpm;
                  }
               }
               // no record were previously added to this structure, create a new structure
               else {
                  cytoscapeNodes[cytoscapeNodeIdx].data.expression[record.stage][record.structure] = record.tpm;
               }

               // check if the current recorded max value for this stage is still the maximum
               const maxExpressedStructure = cytoscapeNodes[cytoscapeNodeIdx].data.expression_max_map[record.stage];
               const maxStageExpressionLvl = cytoscapeNodes[cytoscapeNodeIdx].data.expression[record.stage][maxExpressedStructure];

               // if the new record has a higher TPM, update expression_max_map to match
               if (maxStageExpressionLvl < record.tpm) {
                  cytoscapeNodes[cytoscapeNodeIdx].data.expression_max_map[record.stage] = record.structure;
               }
            }
            // no record was previously added to this stage, so add data with a new stage field
            else {
               cytoscapeNodes[cytoscapeNodeIdx].data.expression[record.stage] = {
                  [record.structure]: record.tpm,
               };
               cytoscapeNodes[cytoscapeNodeIdx].data.expression_max_map[record.stage] = record.structure;
            }

            // if node is new then add directly to cytoscapeNodes
         } else {
            geneNameCache[record["string_id"]] = record.preferred_name;

            cytoscapeNodes.push({
               data: {
                  id: record.preferred_name,
                  uniprot: record.uniprot,
                  expression: {
                     [record.stage]: {
                        [record.structure]: record.tpm,
                     },
                  },
                  expression_max_map: { [record.stage]: record.structure },
               },
            });

            const nodeIdx = cytoscapeNodes.length - 1;
            cytoscapeNodesHashmap[record.string_id] = nodeIdx;
         }

         // keep track of all structures discovered in each stage
         try {
            structuresInStage[record.stage].add(record.structure);
         } catch (error) {
            if (error instanceof TypeError) {
               structuresInStage[record.stage] = new Set();
               structuresInStage[record.stage].add(record.structure);
            } else {
               console.log(error.message);
            }
         }
      });

      // make an array of the different structures in each stage
      const recordedStages = Object.keys(structuresInStage);

      recordedStages.forEach((stage) => {
         structuresInStage[stage] = Array.from(structuresInStage[stage]);
      });

      // some genes would have been lost at this point because some might not have expression data
      // so we need to get their names separately
      const registeredNodes = new Set(Object.keys(geneNameCache));
      const unregisteredNodes = nodeListStringId.filter((x) => !registeredNodes.has(x));

      // if we found nodes that were missing from the previous query
      if (unregisteredNodes.length > 0) {
         const unregisteredNodesSqlQuery = "('" + unregisteredNodes.join("','") + "')";

         const unregisteredNodeNames = await excuteQuery({
            query: `SELECT DISTINCT string.string_id, string.preferred_name, map.uniprot FROM string_id_map AS string RIGHT JOIN map_uniprot AS map ON string.preferred_name = map.gene WHERE string_id IN ${unregisteredNodesSqlQuery}`,
         });

         unregisteredNodeNames.forEach((record) => {
            geneNameCache[record.string_id] = record.preferred_name;
            cytoscapeNodes.push({
               data: {
                  id: record.preferred_name,
                  uniprot: record.uniprot,
                  expression: false,
               },
            });
         });

         // yet sometimes we still have missing nodes because the mapping table is incomplete
         // some string_ids have no uniprot_ids
         // we need to get these from the string_protein_info table which has all the string_id <--> preferred_name mappings
         const updatedRegisteredNodes = new Set(Object.keys(geneNameCache));
         const nodesNoUniprot = nodeListStringId.filter((x) => !updatedRegisteredNodes.has(x));

         if (nodesNoUniprot.length > 0) {
            const nodesNoUniprotSqlQuery = "('" + nodesNoUniprot.join("','") + "')";

            const nodesNoUniprotNames = await excuteQuery({
               query: `SELECT DISTINCT string_id, preferred_name FROM string_protein_info WHERE string_id IN ${nodesNoUniprotSqlQuery}`,
            });

            nodesNoUniprotNames.forEach((record) => {
               geneNameCache[record.string_id] = record.preferred_name;
               cytoscapeNodes.push({
                  data: {
                     id: record.preferred_name,
                     uniprot: null,
                     expression: false,
                  },
               });
            });
         }
      }

      // now get all possible edges between all the nodes and their calculated scores if you have at least a pair
      // construct cytoscapeEdges
      const cytoscapeEdges = [];

      if (nodeListStringId.length > 1) {
         const nodeEdges = await excuteQuery({
            query: `SELECT DISTINCT protein1, protein2, nscore, fscore, pscore, ascore, escore, dscore, tscore, score FROM string_db WHERE protein1 IN ${nodeListSqlQuery} AND protein2 IN ${nodeListSqlQuery} AND protein1 > protein2`,
         });

         nodeEdges.forEach((record) => {

            const scoredEdge = calcStringScores(record, scorechannels);

            if (scoredEdge.combinedScore > 0) {
               const protein1name = geneNameCache[record.protein1];
               const protein2name = geneNameCache[record.protein2];

               const edgeID = protein1name + "_" + protein2name;
               cytoscapeEdges.push({
                  data: {
                     id: edgeID,
                     source: protein1name,
                     target: protein2name,
                     weight: scoredEdge.combinedScore,
                  },
               });
            }
         });
      }

      // collate expression data for each gene through the stages for Nivo Charts
      // let nivoChartsData = {}

      // cytoscapeNodes.forEach(cytoscapeNode => {

      //    nivoChartsData[cytoscapeNode.data.id] = []

      //    if (!cytoscapeNode.data.expression) {
      //       nivoChartsData[cytoscapeNode.data.id] = false
      //    } 
         
      //    else {

      //       for (let stage=26; stage > 0; stage--) {

      //          const structureWithMaxTPM = cytoscapeNode.data.expression_max_map[stage]

      //          if (structureWithMaxTPM !== undefined) {

      //             const maxTPM = cytoscapeNode.data.expression[stage][structureWithMaxTPM]

      //             if (maxTPM >= 100) {
      //                nivoChartsData[cytoscapeNode.data.id].push({stage: stage, high: Math.round(maxTPM), medium: null, low: null, expressed: null})
      //             } else if (10 <= maxTPM < 100) {
      //                nivoChartsData[cytoscapeNode.data.id].push({stage: stage, high: null, medium: Math.round(maxTPM), low: null, expressed: null})
      //             } else if (0.5 <= maxTPM < 10) {
      //                nivoChartsData[cytoscapeNode.data.id].push({stage: stage, high: null, medium: null, low: Math.round(maxTPM), expressed: null})
      //             } else if (maxTPM < 0.5) {
      //                nivoChartsData[cytoscapeNode.data.id].push({stage: stage, high: null, medium: null, low: null, expressed: 1})
      //             }
                        
      //          }

      //          else {
      //             nivoChartsData[cytoscapeNode.data.id].push({
      //                stage: stage,
      //                high: null,
      //                medium: null,
      //                low: null,
      //                expressed: null
      //             })
      //          }

      //       }

      //    }

      // })

      const graph = {nodes: cytoscapeNodes, edges: cytoscapeEdges}

      // const geneList = nodeListStringId

      return res.status(200).json({ graph, structuresInStage });
   }
}
