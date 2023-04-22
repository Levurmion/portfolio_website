import React, { Component, useEffect } from "react";
import cytoscape from "cytoscape";
import popper from "cytoscape-popper";
import reactElementToJSXString from "react-element-to-jsx-string";
import RecenterButton from "../RecenterButton/RecenterButton.jsx";
import "tippy.js/dist/tippy.css";
import styles from "./cytoscapePanel.module.scss";
import InfoPanel from "../InfoPanel/InfoPanel.jsx";

cytoscape.use(popper);

class CytoscapePanel extends Component {
  constructor() {
    super();
    this.state = {
      cy: null,
      secondaryInteractions: null,
      directInteractions: null,
      allNodes: null,
      allEdges: null,
      queryNode: null,
      openInfoBox: false,
      clickedNode: null,
      sortedEdgeList: [],
      interactionAbove: [],
      interactionBelow: [],
      lastShownInteractions: null,
      shownInteractions: null,
      lastHiddenInteractions: null,
      hiddenInteractions: null,
      nodeColors: {
        normal: { node2: "#ee5d6c", node3: "#8e7fe3", node4: "#f5c889" },
        tpm: {
          node4: "#368de3",
          node1: "#178967",
          node2: "#52ba69",
          node3: "#a2d88f",
          node5: "#c2a5a5",
        },
      },
      tpmNodeSizes: {
        noData: { width: 30, height: 30 },
        notExp: { width: 30, height: 30 },
        high: { width: 40, height: 40 },
        med: { width: 30, height: 30 },
        low: { width: 20, height: 20 },
      },
    };
  }

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!! COMPONENT METHODS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  // load cytoscape graph
  load_cytoscape = (elements, queryGene) => {
    this.state.cy = cytoscape({
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

    let edges = this.state.cy.collection("edge");
    let queryNode = this.state.cy.collection(`node[id="${queryGene}"]`);
    let firstLayerEdges = this.state.cy.collection(
      `edge[source="${queryGene}"], edge[target="${queryGene}"]`
    );
    let firstLayerNodes = firstLayerEdges.connectedNodes();

    this.state.queryNode = queryNode

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

    queryNode.style({
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
      edgeElasticity: function (edge) {
        return 32;
      },
      nodeRepulsion: function (node) {
        return 10000;
      },
      initialTemp: 2000,
      minTemp: 10,
      coolingFactor: 0.99,
      nodeOverlap: 100000,
      gravity: 10000,
    };

    // wrapper callback to handle popups in React
    const handleNodeClickCallback = (node) => {
      this.handleNodeClickPopups(node);
    };

    const handleNodeUnclickCallback = () => {
      this.handleNodeUnclickPopups();
    };

    // node hover
    this.state.cy.on("click", function (event) {
      if (event.target.length == undefined) {
        handleNodeUnclickCallback();
      } else if (event.target.length == 1) {
        handleNodeClickCallback(event.target);
      }
    });

    this.state.cy.layout(options).run();

    // bind eventListeners manually to all cytoscape elements
    // mouse events CANNOT be handled by tippy.js inside cytoscape
    this.state.cy.nodes().unbind("mouseover");
    this.state.cy
      .nodes()
      .bind("mouseover", (event) => event.target.tippy.show());

    this.state.cy.nodes().unbind("mouseout");
    this.state.cy
      .nodes()
      .bind("mouseout", (event) => event.target.tippy.hide());

    // keep updating new position of nodes when dragged
    this.state.cy.nodes().unbind("drag");
    this.state.cy
      .nodes()
      .bind("drag", (event) => event.target.tippy.popperInstance.update());
  };

  // function to generate tippies
  makeTippy = (node) => {
    var ref = node.popperRef();
    var dummyDomEle = document.createElement("div");

    node.tippy = tippy(dummyDomEle, {
      onShow: function (instance) {
        // mandatory
        // binds tippy instance to the node (ref)
        instance.popperInstance.reference = ref;
      },
      lazy: false, // mandatory
      // dom element inside the tippy:
      content: reactElementToJSXString(this.renderTooltipContents(node)),

      // your own preferences:
      theme: "nodeInfo",
      animation: "shift-away",
      arrow: true,
      placement: "bottom",
      followCursor: "true",
      hideOnClick: false,
      multiple: true,
      interactive: true,
      appendTo: document.body, //<-- Add This Line some kind of peculiarity with cytoscape
      sticky: true,
      distance: -5,
      allowHTML: true,
    });
  };

  // render TPM values only under show expression mode
  renderTooltipContents = (node) => {
    
    let structureText = null;
    let valueText = null;

    if (this.props.showExpressionData == true) {
      structureText = <div>{this.props.selectedStructure == "Max TPM (any structure)" ? `Max TPM (${node.data("expression_max_map") != undefined ? (node.data("expression_max_map")[this.props.selectedStage] != undefined ? node.data("expression_max_map")[this.props.selectedStage] : "any structure") : "any structure"})` : this.props.selectedStructure }</div>;

      if (node.data('expression') == false) {

        valueText = "no data"

      } else if (this.props.selectedStructure == "Max TPM (any structure)" && node.data("expression_max_map")[this.props.selectedStage] != undefined) {

        let expressionLevel = node.data("expression")[this.props.selectedStage][node.data("expression_max_map")[this.props.selectedStage]];
        if (expressionLevel > 0) {
          valueText = (
            <div>{`${Math.round(expressionLevel)} TPM`}</div>
          );
        } else {
          valueText = (
            <div>detected</div>
          )
        }

      } else if (this.props.selectedStructure != "Max TPM (any structure)" &&node.data("expression")[this.props.selectedStage] != undefined) {

        let expressionLevel = node.data("expression")[this.props.selectedStage][
          this.props.selectedStructure
        ];
        if (expressionLevel > 0) {
          valueText = (
            <div>{`${Math.round(expressionLevel)} TPM`}</div>
          );
        } else {
          valueText = (
            <div>detected</div>
          )
        }

      } else {

        valueText = <div>not expressed</div>;

      }
    }

    // NEED T0 DISABLE LINK WHEN UNIPROT DOES NOT EXIST <--- FIX THIS
    return (
      <div style="display: flex; flex-direction: column; align-items: center;">
        <a
          className={styles.uniprotLink}
          target='_blank'
          href={`https://www.uniprot.org/uniprotkb/${node.data(
            "uniprot"
          )}/entry`}>
           {node.data("uniprot") != null ? "Go to UNIPROT:" + node.data("uniprot") : "no UNIPROT ID" }
        </a>
        {structureText !== null && valueText != null ? <div style="display: flex; align-items: center; flex-direction: column; margin-top: 0.3vh; border-radius: 4px; background-color: #09A079; padding-top: 0.4vh; padding-bottom: 0.4vh; padding-inline: 0.4vw; width: 100%;">
          {structureText}
          {valueText}
        </div> : ""}
      </div>
    );
  };

  // format to expression data
  showTPM = (stage, structure) => {
    this.state.allNodes.forEach((node) => {
      let expressionData = null;
      let expressionLevel = null;

      if (node.data("expression") == false) {
        expressionLevel = undefined;
      } else {
        expressionData = node.data("expression")[stage];

        if (
          structure == "Max TPM (any structure)" &&
          expressionData != undefined
        ) {
          let maxExpressStruct = node.data("expression_max_map")[stage];

          if (maxExpressStruct != undefined) {
            expressionLevel = expressionData[maxExpressStruct];
          } else {
            expressionLevel = undefined;
          }
        } else if (expressionData != undefined) {
          expressionLevel = expressionData[structure];
        } else {
          expressionLevel = undefined;
        }
      }

      if (100 < expressionLevel) {
        node.style({
          "background-color": this.state.nodeColors.tpm.node1,
          width: this.state.tpmNodeSizes.high.width,
          height: this.state.tpmNodeSizes.high.height,
        });
      } else if (expressionLevel > 10) {
        node.style({
          "background-color": this.state.nodeColors.tpm.node2,
          width: this.state.tpmNodeSizes.med.width,
          height: this.state.tpmNodeSizes.med.height,
        });
      } else if (expressionLevel > 0) {
        node.style({
          "background-color": this.state.nodeColors.tpm.node3,
          width: this.state.tpmNodeSizes.low.width,
          height: this.state.tpmNodeSizes.low.height,
        });
      } else if (expressionLevel == 0) {
        node.style({
          "background-color": this.state.nodeColors.tpm.node4,
          width: this.state.tpmNodeSizes.noData.width,
          height: this.state.tpmNodeSizes.noData.height,
        });
      } else if (expressionLevel == undefined) {
        node.style({
          "background-color": this.state.nodeColors.tpm.node5,
          width: this.state.tpmNodeSizes.notExp.width,
          height: this.state.tpmNodeSizes.notExp.height,
        });
      }
    });
  };

  // format to hide expression data
  hideTPM = (queryGene) => {
    let queryNode = this.state.cy.collection(`node[id="${queryGene}"]`);
    let firstLayerEdges = this.state.cy.collection(
      `edge[source="${queryGene}"], edge[target="${queryGene}"]`
    );
    let firstLayerNodes = firstLayerEdges.connectedNodes();

    this.state.allNodes.style({
      "background-color": "#f5c889",
      width: 30,
      height: 30,
    });

    firstLayerNodes.style({
      "background-color": "#8e7fe3",
    });

    queryNode.style({
      "background-color": "#ee5d6c",
    });
  };
  // filter out secondary interactions from direct interactions
  // not going to trigger an update because this.state not modified by this.setState()
  groupEdges = () => {
    this.state.directInteractions = this.state.cy
      .edges()
      .filter(
        `edge[source="${this.props.queryGene}"], edge[target="${this.props.queryGene}"]`
      );
    this.state.secondaryInteractions = this.state.cy
      .edges()
      .difference(this.state.directInteractions);

    // console.log("grouping edges!")
    // console.log("direct interactions: ", this.state.directInteractions)
    // console.log("secondary interactions: ", this.state.secondaryInteractions)
  };

  roundDown = (num, decimalPlaces = 0) => {
    num = Math.floor(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
  };

  // toggle secondary interactions
  toggleSecondaryInteractions = () => {
    // console.log('toggling secondary interactions!')
    if (this.props.showSecInteractions == false) {
      if (this.props.aboveThreshold == true) {
        this.state.lastShownInteractions = this.state.shownInteractions;
        this.state.shownInteractions = this.state.cy.collection(
          this.state.cy
            .collection(this.state.interactionAbove)
            .difference(this.state.secondaryInteractions)
        );
      } else if (this.props.aboveThreshold == false) {
        this.state.lastShownInteractions = this.state.shownInteractions;
        this.state.shownInteractions = this.state.cy.collection(
          this.state.cy
            .collection(this.state.interactionBelow)
            .difference(this.state.secondaryInteractions)
        );
      }
    } else {
      if (this.props.aboveThreshold == true) {
        this.state.lastShownInteractions = this.state.shownInteractions;
        this.state.shownInteractions = this.state.cy.collection(
          this.state.interactionAbove
        );
      } else if (this.props.aboveThreshold == false) {
        this.state.lastShownInteractions = this.state.shownInteractions;
        this.state.shownInteractions = this.state.cy.collection(
          this.state.interactionBelow
        );
      }
    }
  };

  // toggle expression data
  toggleExpressionData = () => {
    if (this.props.showExpressionData == true) {
      // console.log("showing expression data");
      this.showTPM(this.props.selectedStage, this.props.selectedStructure);
    } else if (this.props.showExpressionData == false) {
      // console.log("hiding expression data");
      this.hideTPM(this.props.queryGene);
    }
  };

  // binary search to slice the edgeList quickly
  binarySearch = (sortedArr, value, sliceIdx=[0,sortedArr.length]) => {

    if (sliceIdx[1] - sliceIdx[0] <= 1) {

      if (sortedArr[sliceIdx[0]].data("weight") > value) {
        return sliceIdx[0]
      } else {
        return sliceIdx[1]
      }

    } else {

      let midpoint = Math.floor((sliceIdx[0]+sliceIdx[1])/2)

      if (value < sortedArr[midpoint].data("weight")) {
        return this.binarySearch(sortedArr, value, [sliceIdx[0], midpoint])
      } else if (value >= sortedArr[midpoint].data("weight")) {
        return this.binarySearch(sortedArr, value, [midpoint, sliceIdx[1]])
      }

    }

  }

  // split interactions into ABOVE and BELOW stacks
  // this.state.interactionAbove   START [first item (highest conf), ... , last item (lowest conf)] END
  // this.state.interactionBelow   START [first item (lowest conf), ... , last item (highest conf)] END
  initializeInteractionStack = (threshold, edgeList) => {

    // ascending sort
    let sortedEdgeList = edgeList.sort(
      (edge1, edge2) => edge1.data("weight") - edge2.data("weight")
    );

    this.state.sortedEdgeList = sortedEdgeList

    let sliceIdx = this.binarySearch(sortedEdgeList,threshold)

    this.state.interactionBelow = [...sortedEdgeList.slice(0,sliceIdx)];
    this.state.interactionAbove = [...sortedEdgeList.slice(sliceIdx,sortedEdgeList.length)];

  };

  // handle stacks when the new props.selectedConfidence the difference is large
  handleInteractionStacksBSearch = (threshold) => {

    let sliceIdx = this.binarySearch(this.state.sortedEdgeList, threshold);

    this.state.interactionBelow = [...this.state.sortedEdgeList.slice(0,sliceIdx)];
    this.state.interactionAbove = [...this.state.sortedEdgeList.slice(sliceIdx,this.state.sortedEdgeList.length)];

  };

  // handle stacks when the new props.selectedConfidence difference is 0.001 - indicates sliding
  handleInteractionStacksSliding = (threshold, increasing) => {

    if (increasing == true) {
      let edgeWasAbove = this.state.interactionAbove[0] < threshold ? this.state.interactionAbove.shift() : null;
      if (edgeWasAbove != null) {
        this.state.interactionBelow.push(edgeWasAbove);
      }
    } else if (increasing == false) {
      let edgeWasBelow = this.state.interactionBelow[-1] >= threshold ? this.state.interactionBelow.pop() : null;
      if (edgeWasBelow != null) {
        this.state.interactionAbove.unshift(edgeWasBelow);
      }
    }

  }

  // popups for nodes
  handleNodeClickPopups = (nodeElem) => {
    this.setState({
      openInfoBox: true,
      clickedNode: nodeElem,
    });
  };

  handleNodeUnclickPopups = () => {
    this.setState({
      openInfoBox: false,
      clickedNode: null,
    });
  };

  handleRecentre = () => {
    this.state.cy.fit()
  }

  // update routine script
  handleUpdateRoutines = (prevProps) => {

    if (prevProps == null) {
      this.handleInteractionStacksBSearch(this.props.selectedConfidence);
    } else if (Math.abs(prevProps.selectedConfidence - this.props.selectedConfidence) > 0.001) {
      this.handleInteractionStacksBSearch(this.props.selectedConfidence);
    } else if (this.props.selectedConfidence - prevProps.selectedConfidence === 0.001) {
      this.handleInteractionStacksSliding(this.props.selectedConfidence, true)
    } else if (this.props.selectedConfidence - prevProps.selectedConfidence === -0.001) {
      this.handleInteractionStacksSliding(this.props.selectedConfidence, false)
    }

    this.toggleSecondaryInteractions();
    this.state.lastHiddenInteractions = this.state.hiddenInteractions;
    this.state.hiddenInteractions = this.state.allEdges.difference(this.state.shownInteractions);

    let newEdgesToShow = this.state.shownInteractions.difference(this.state.lastShownInteractions);
    let newEdgesToHide = this.state.hiddenInteractions.difference(this.state.lastHiddenInteractions);

    if (this.props.keepNodes == false) {

      let nodesToRemove = null;
      let nodesToRestore = newEdgesToShow.connectedNodes();
      nodesToRestore.restore();
      newEdgesToShow.restore();
      newEdgesToHide.remove();

      if (prevProps == null) {
        nodesToRemove = this.state.hiddenInteractions.connectedNodes().filter((node) => {
          return node.connectedEdges().length === 0;
        });
      } else {
        nodesToRemove = (prevProps.keepNodes == true && this.props.keepNodes == false ? this.state.hiddenInteractions : newEdgesToHide).connectedNodes().filter((node) => {
          return node.connectedEdges().length === 0;
        });
      }

      nodesToRemove.remove();

    } else {

      this.state.allNodes.restore();
      newEdgesToShow.restore();
      newEdgesToHide.remove();

    }

    this.state.queryNode.restore()

    this.toggleExpressionData();
  };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!! NATIVE REACT FUNCTIONS TO HANDLE COMPONENT LIFECYCLE !!!!!!!!!!!!!!!!!!!!!!!!!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV!!!!!!!!!!!!!!!!!!!!!!!!!!

  // methods to call on mounting to DOM
  componentDidMount() {

    // console.log("loaded elements: ",this.props.elements)

    this.load_cytoscape(this.props.elements, this.props.queryGene);

    this.state.cy.nodes().forEach((node) => {
      this.makeTippy(node, this.renderTooltipContents(node));
    });

    this.groupEdges();
    this.state.allNodes = this.state.cy.nodes();
    this.state.allEdges = this.state.cy.edges();
    this.initializeInteractionStack(
      this.props.selectedConfidence,
      this.state.allEdges
    );

    this.handleUpdateRoutines(null);
    // console.log(this.state.allNodes);
  }

  // if elements change, re-render cytoscape graph
  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevProps !== this.props) {

      if (prevProps.elements !== this.props.elements) {
        // console.log("elements changed!");
        this.load_cytoscape(this.props.elements, this.props.queryGene);

        this.groupEdges();
        this.state.allNodes = this.state.cy.nodes();
        this.state.allEdges = this.state.cy.edges();
        this.initializeInteractionStack(
          this.props.selectedConfidence,
          this.state.allEdges
        );
      }

      this.handleUpdateRoutines(prevProps);
    }

    // redo tippies if selectedStructure/selectedStage changes
    if (
      prevProps.selectedStage != this.props.selectedStage ||
      prevProps.selectedStructure != this.props.selectedStructure ||
      prevProps.showExpressionData != this.props.showExpressionData
    ) {

      this.state.cy.nodes().forEach((node) => node.tippy.hide());

      this.state.cy.nodes().filter(node => node.visible()).forEach((node) => {
        this.makeTippy(node, this.renderTooltipContents(node));
      });
    }
  }

  // after prop updates, modify graph based on this.props.Options
  componentDidUpdate() {
    // on component re-render in response to props changes, redo nodes and edges
    // console.log(this.props);
  }

  render() {
    return (
      <div className={styles.cy}>
        <InfoPanel
          infoMode={this.props.showExpressionData == true ? "tpm" : "normal"}
          warningMode={this.props.nodesToDisplay < 100 ? false : true}
        />

        <RecenterButton
          className={styles.recenterButton}
          notifyRecentre={this.handleRecentre}
        />
      </div>
    );
  }
}

export default React.memo(CytoscapePanel);
