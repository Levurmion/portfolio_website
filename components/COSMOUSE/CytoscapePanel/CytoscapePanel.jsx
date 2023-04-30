import cytoscape from "cytoscape";
import styles from "./CytoscapePanel.module.scss";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { GraphContext } from "../../../lib/contexts";

const nodeColors = {
   normal: { node2: "#ee5d6c", node3: "#8e7fe3", node4: "#f5c889" },
   tpm: {
      node4: "#368de3",
      node1: "#178967",
      node2: "#52ba69",
      node3: "#a2d88f",
      node5: "#c2a5a5",
   },
};

const tpmNodeSizes = {
   noData: { width: 30, height: 30 },
   notExp: { width: 30, height: 30 },
   high: { width: 40, height: 40 },
   med: { width: 30, height: 30 },
   low: { width: 20, height: 20 },
};

function CytoscapePanel({ secondaryInt, expressionData, confidence, aboveConf, dropNodes, selectedStructure, stage }) {
   // subscribe to GraphContext
   const graphData = useContext(GraphContext);

   // cytoscape core object references
   const cy = useRef(null);
   const queryNodeName = useRef(null);
   const queryNode = useRef(null);
   const allNodes = useRef(null);
   const sortedEdges = useRef(null);
   const edgesAbove = useRef(null);
   const edgesBelow = useRef(null);
   const sliceIdx = useRef(null);
   const directInt = useRef(null);
   const secInt = useRef(null);
   const hiddenEdges = useRef(null);
   const shownEdges = useRef(null);
   const directNodes = useRef(null);
   const otherNodes = useRef(null);

   function loadCytoscape(elements) {
      cy.current = cytoscape({
         // container: where to render the graph
         container: document.getElementById("cy"),
         // elements: nodes and edges of the graph in JSON format
         elements: elements,
         // styling options
         style: [
            {
               selector: "node",
               style: {
                  layout: {
                     name: "circle",
                  },
                  shape: "ellipse",
                  "background-color": "#f5c889",
                  label: "data(id)",
               },
            },
            {
               selector: ":selected",
               style: {
                  label: "data(weight)",
               },
            },
         ],
         selectionType: "single",
      });

      let edges = cy.current.collection("edge");
      let queryGene = cy.current.collection(`node[id="${queryNodeName.current}"]`);
      let firstLayerEdges = cy.current.collection(`edge[source="${queryNodeName.current}"], edge[target="${queryNodeName.current}"]`);
      let firstLayerNodes = firstLayerEdges.connectedNodes();

      // sort in ascending order
      sortedEdges.current = edges.sort((edgeA, edgeB) => {
         const scoreA = edgeA.data("weight");
         const scoreB = edgeB.data("weight");

         if (scoreA > scoreB) {
            return 1;
         } else if (scoreA < scoreB) {
            return -1;
         } else {
            return 0;
         }
      });

      // save nodes as a ref
      allNodes.current = cy.current.nodes();
      queryNode.current = queryGene;

      // preliminary styling
      edges.forEach((edge) => {
         edge.style({ "line-color": "#c7c7c7" });
      });

      firstLayerNodes.forEach((node) => {
         node.style({ "background-color": "#8e7fe3" });
      });

      firstLayerEdges.forEach((edge) => {
         edge.style({ "line-color": "#eeaf61" });
      });

      queryGene.style({
         "background-color": "#ee5d6c",
      });

      // adjust line thickness based on confidence score
      for (let edge of edges) {
         if (edge.data("weight") > 0.7) {
            edge.style({
               width: "4px",
            });
         } else if (edge.data("weight") > 0.4) {
            edge.style({
               width: "2px",
            });
         } else {
            edge.style({
               width: "2px",
               "line-style": "dotted",
            });
         }
      }

      // graph layout options
      let options = {
         name: "cose",
         animate: false,
         animationDuration: 3000,
         idealEdgeLength: function (edge) {
            let edgeWeight = edge.data("weight");
            let length = (1 / edgeWeight) * 20;
            return length;
         },
         edgeElasticity: function () {
            return 32;
         },
         nodeRepulsion: function () {
            return 10000;
         },
         initialTemp: 2000,
         minTemp: 10,
         coolingFactor: 0.99,
         nodeOverlap: 100000,
         gravity: 10000,
      };

      cy.current.layout(options).run();
   }

   function groupEdges() {
      directInt.current = cy.current.edges().filter(`edge[source="${queryNodeName.current}"], edge[target="${queryNodeName.current}"]`);
      secInt.current = cy.current.edges().difference(directInt.current);
   }

   function groupNodes() {
      const shownDirectInt = shownEdges.current.intersection(directInt.current);
      directNodes.current = shownDirectInt.map((edge) => {
         const source = edge.source();
         const target = edge.target();
         if (source.data("id") !== queryNodeName.current) {
            return source;
         } else if (target.data("id") !== queryNodeName.current) {
            return target;
         }
      });
      // convert array into a cytoscape collection
      directNodes.current = cy.current.collection(directNodes.current);

      otherNodes.current = allNodes.current.difference(queryNode.current);
      otherNodes.current = otherNodes.current.difference(directNodes.current);
   }

   function paintNodes() {
      // normal mode
      if (expressionData === false) {
         allNodes.current.style({
            "background-color": "#f5c889",
            width: 30,
            height: 30,
         });
         directNodes.current.style({
            "background-color": "#8e7fe3",
         });
         queryNode.current.style({
            "background-color": "#ee5d6c",
         });
      } 
      // expression mode
      else if (expressionData === true) {

         allNodes.current.forEach((node) => {
            let expression_data = null;
            let expression_level = undefined;

            if (node.data("expression") == false) {
               expression_level = undefined;
            } else {
               expression_data = node.data("expression")[stage];

               if (selectedStructure == "Max TPM" && expression_data !== undefined) {
                  const maxExpressStruct = node.data("expression_max_map")[stage];

                  if (maxExpressStruct != undefined) {
                     expression_level = expression_data[maxExpressStruct];
                  } else {
                     expression_level = undefined;
                  }

               } else if (expression_data !== undefined) {
                  expression_level = expression_data[selectedStructure];
               } else {
                  expression_level = undefined;
               }
            }

            console.log(node.data('id'), expression_level)

            if (100 < expression_level) {
               node.style({
                  "background-color": nodeColors.tpm.node1,
                  width: tpmNodeSizes.high.width,
                  height: tpmNodeSizes.high.height,
               });
            } else if (expression_level > 10) {
               node.style({
                  "background-color": nodeColors.tpm.node2,
                  width: tpmNodeSizes.med.width,
                  height: tpmNodeSizes.med.height,
               });
            } else if (expression_level > 0) {
               node.style({
                  "background-color": nodeColors.tpm.node3,
                  width: tpmNodeSizes.low.width,
                  height: tpmNodeSizes.low.height,
               });
            } else if (expression_level === 0) {
               node.style({
                  "background-color": nodeColors.tpm.node4,
                  width: tpmNodeSizes.noData.width,
                  height: tpmNodeSizes.noData.height,
               });
            } else if (expression_level === undefined) {
               node.style({
                  "background-color": nodeColors.tpm.node5,
                  width: tpmNodeSizes.notExp.width,
                  height: tpmNodeSizes.notExp.height,
               });
            }
         });
      }
   }

   function binarySearch(sortedArr, value, sliceIdx = [0, sortedEdges.current.length]) {
      if (sliceIdx[1] - sliceIdx[0] <= 1) {
         if (sortedArr[sliceIdx[0]].data("weight") > value) {
            return sliceIdx[0];
         } else {
            return sliceIdx[1];
         }
      } else {
         let midpoint = Math.floor((sliceIdx[0] + sliceIdx[1]) / 2);

         if (value < sortedArr[midpoint].data("weight")) {
            return binarySearch(sortedArr, value, [sliceIdx[0], midpoint]);
         } else if (value >= sortedArr[midpoint].data("weight")) {
            return binarySearch(sortedArr, value, [midpoint, sliceIdx[1]]);
         }
      }
   }

   function filterEdges() {
      sliceIdx.current = binarySearch(sortedEdges.current, confidence);
      const edgeListLength = sortedEdges.current.length;
      edgesAbove.current = sortedEdges.current.slice(sliceIdx.current, edgeListLength);
      edgesBelow.current = sortedEdges.current.slice(0, sliceIdx.current);
   }

   function renderEdges() {
      if (aboveConf === true) {
         shownEdges.current = edgesAbove.current;
         hiddenEdges.current = edgesBelow.current;
      } else if (aboveConf === false) {
         shownEdges.current = edgesBelow.current;
         hiddenEdges.current = edgesAbove.current;
      }

      if (secondaryInt === false) {
         shownEdges.current = shownEdges.current.difference(secInt.current);
         hiddenEdges.current = hiddenEdges.current.union(secInt.current);
      }

      if (dropNodes === true) {
         const nodesToRestore = shownEdges.current.connectedNodes();
         nodesToRestore.restore();
         shownEdges.current.restore();

         hiddenEdges.current.remove();
         const nodesToHide = hiddenEdges.current.connectedNodes().filter((node) => {
            return node.connectedEdges().length === 0;
         });
         nodesToHide.remove();

         queryNode.current.restore();
      } else if (dropNodes === false) {
         allNodes.current.restore();
         shownEdges.current.restore();
         hiddenEdges.current.remove();
      }
   }

   // useEffect to handle expression data
   useEffect(() => {
      if (allNodes.current !== null) {
         paintNodes()
      }
      
   }, [expressionData, selectedStructure, stage]);

   // useEffect to handle edges
   useEffect(() => {
      if (sortedEdges.current !== null) {
         filterEdges();
         renderEdges();
         groupNodes();
         paintNodes();
      }
   }, [expressionData, secondaryInt, confidence, aboveConf, dropNodes]);

   // useEffect to handle graph reload
   useEffect(() => {
      queryNodeName.current = graphData.queryNode;
      if (graphData.graph !== null) {
         loadCytoscape(graphData.graph);
         groupEdges();
      }

      // re-initialize settings with every graph load
      if (sortedEdges.current !== null) {
         filterEdges();
         renderEdges();
         groupNodes();
         paintNodes();
      }
   }, [graphData]);

   return (
      <div id='cy' className={styles.cytoscapePanel}>
         {graphData.graph === null ? "LOADING" : ""}
      </div>
   );
}

export default CytoscapePanel;
