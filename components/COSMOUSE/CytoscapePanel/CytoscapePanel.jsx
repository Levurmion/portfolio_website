import cytoscape from "cytoscape";
import styles from "./CytoscapePanel.module.scss";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { GraphContext } from "../../../lib/contexts";

// custom useEffect hooks
function handleEdges(secondaryInt, confidence, aboveConf, dropNodes) {}

function CytoscapePanel({ secondaryInt, expressionData, confidence, aboveConf, dropNodes, selectedStructure, stage }) {
   // subscribe to GraphContext
   const graphData = useContext(GraphContext);

   // cytoscape core object reference
   const cy = useRef(null);
   const queryNodeName = useRef(null);
   const queryNode = useRef(null)
   const allNodes = useRef(null)
   const sortedEdges = useRef(null);
   const edgesAbove = useRef(null);
   const edgesBelow = useRef(null);
   const sliceIdx = useRef(null);
   const directInt = useRef(null);
   const secInt = useRef(null);
   const hiddenEdges = useRef(null);
   const shownEdges = useRef(null);
   const directNodes = useRef(null);
   const otherNodes = useRef(null)

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
      allNodes.current = cy.current.nodes()
      queryNode.current = queryGene

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
      const shownDirectInt = shownEdges.current.intersection(directInt.current)
      directNodes.current = shownDirectInt.map(edge => {
         const source = edge.source()
         const target = edge.target()
         if (source.data('id') !== queryNodeName.current) {
            return source
         } else if (target.data('id') !== queryNodeName.current) {
            return target
         }
      })
      // convert array into a cytoscape collection
      directNodes.current = cy.current.collection(directNodes.current)

      otherNodes.current = allNodes.current.difference(queryNode.current)
      otherNodes.current = otherNodes.current.difference(directNodes.current)
   }

   function paintNodes() {
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
         nodesToRestore.restore()
         shownEdges.current.restore();

         hiddenEdges.current.remove();
         const nodesToHide = hiddenEdges.current.connectedNodes().filter((node) => {
            return node.connectedEdges().length === 0;
         });
         nodesToHide.remove()

         queryNode.current.restore()
         
      } else if (dropNodes === false) {
         allNodes.current.restore()
         shownEdges.current.restore();
         hiddenEdges.current.remove();
      }
   }

   // useEffect to handle edges
   useEffect(() => {
      if (sortedEdges.current !== null) {
         filterEdges();
         renderEdges();
         groupNodes();
         paintNodes();
      }
   }, [secondaryInt, confidence, aboveConf, dropNodes]);

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
