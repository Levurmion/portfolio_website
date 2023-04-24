import cytoscape from "cytoscape";
import styles from './CytoscapePanel.module.scss'
import { useContext, useEffect, useRef } from "react";
import { GraphContext } from "../../../lib/contexts";

function CytoscapePanel({ showSecInteractions, confThreshold, confAboveBelow, showExpressionData, expressionStage, expressionStruct }) {

   // subscribe to GraphContext
   const graphData = useContext(GraphContext)

   const queryNode = useRef(null)

   function loadCytoscape(elements) {
      let cy = cytoscape({
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
  
      let edges = cy.collection("edge");
      let queryGene = cy.collection(`node[id="${queryNode.current}"]`);
      let firstLayerEdges = cy.collection(
        `edge[source="${queryNode.current}"], edge[target="${queryNode.current}"]`
      );
      let firstLayerNodes = firstLayerEdges.connectedNodes();
      
      console.log(queryNode.current)
      console.log(queryGene)
  
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

      cy.layout(options).run();
   }

   useEffect(() => {
      queryNode.current = graphData.queryNode
      if (graphData.graph !== null) {
         loadCytoscape(graphData.graph)
      }
   }, [graphData])

   return ( 
      <div id='cy' className={styles.cytoscapePanel}>
         {graphData.graph === null ? 'LOADING' : ''}
      </div>
   );
}

export default CytoscapePanel;