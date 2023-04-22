import React, { Component } from "react";
import ReactDOM from "react-dom";
import CytoscapePanel from "../CytoscapePanel/CytoscapePanel.jsx";
import OptionsPanel from "../OptionsPanel/OptionsPanel.jsx";
import Legends from "../Legends/Legends.jsx";
import styles from "./mainPanel.module.scss";

class MainPanel extends Component {
  // MainPanel states
  state = {
    // cytoscape and AJAX states
    cytoscapeElems: null,
    structuresInStages: undefined,
    queryGene: null,
    loadSuccesful: null,
    nodesToDisplay: 10,
    scoreChannels: [
      "score",
      "nscore",
      "fscore",
      "pscore",
      "ascore",
      "escore",
      "dscore",
      "tscore",
    ],
    nodesToDisplay: 10,

    // OPTION STATES
    showSecInteractions: true,
    showExpressionData: false,
    selectedStructure: "Max TPM (any structure)",
    selectedStage: "1",
    aboveThreshold: true,
    keepNodes: true,
    selectedConfidence: 0.4,
    // dropNodes: false,
  };

  // AJAX call for cytoscape data
  loadCytoscapeData = () => {
    let queryGene = 'BRCA1';

    let onloadParams = {
      gene: queryGene,
      numberNodes: 10,
      scoreChannels: [
        "score",
        "nscore",
        "fscore",
        "pscore",
        "ascore",
        "escore",
        "dscore",
        "tscore",
      ],
    };

    let onloadQueryStr = new URLSearchParams(onloadParams);
    let onloadCytoscapeURL = "/results/loadppi?" + onloadQueryStr.toString();

    fetch(onloadCytoscapeURL)
      .then((response) => response.json())
      .then((data) => {
        if (data.nivoChartsData != undefined) {
          this.props.liftCoexpData(data.nivoChartsData)
        } else {
          this.props.liftCoexpData({})
        }
        this.setState({
          cytoscapeElems: data.graph,
          structuresInStages: data.structures,
          queryGene: queryGene,
          loadSuccesful: true,
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          loadSuccesful: false,
        });
      });
  };

  ReloadCytoscapeData = () => {
    let windowURL = window.location.href;
    let windowSearchParamsObj = new URL(windowURL).searchParams;
    let queryGene = windowSearchParamsObj.get("gene").toUpperCase();
    this.props.liftCoexpData({})

    // console.log(parseInt(this.state.nodesToDisplay))

    let reloadParams = {
      gene: queryGene,
      numberNodes: parseInt(this.state.nodesToDisplay),
      scoreChannels: this.state.scoreChannels,
    };

    let reloadQueryStr = new URLSearchParams(reloadParams);
    let reloadCytoscapeURL = "/results/loadppi?" + reloadQueryStr.toString();

    let reloadResponse = fetch(reloadCytoscapeURL);

    this.setState({
      cytoscapeElems: undefined,
      structuresInStages: undefined,
      queryGene: null,
      loadSuccesful: null,
    });

    reloadResponse
      .then((response) => response.json())
      .then((data) => {
        if (data.nivoChartsData != undefined) {
          this.props.liftCoexpData(data.nivoChartsData)
        } else {
          this.props.liftCoexpData({})
        }
        this.setState({
          cytoscapeElems: data.graph,
          structuresInStages: data.structures,
          queryGene: queryGene,
          loadSuccesful: true,
        });
      })
      .catch((response) => {
        console.log(response)
        this.setState({
          loadSuccesful: false,
        });
      });
  };

  // conditional render of cytoscape graph while fetching data
  handleCytoscapeLoad = () => {
    if (
      this.state.cytoscapeElems == undefined &&
      this.state.loadSuccesful == null
    ) {
      return (
        <div className={styles.loadingScreen}>
          <span>PPI Fetching...</span>
        </div>
      );
    } else if (this.state.loadSuccesful == false) {
      return (
        <div className={styles.errorScreen}>
          <span>Sorry, something went wrong...</span>
        </div>
      );
    } else if (
      this.state.cytoscapeElems == undefined &&
      this.state.loadSuccesful == true
    ) {
      // console.log(this.state)
      return (
        <div className={styles.noDataScreen}>
          <span>no interaction data available for this gene...</span>
        </div>
      );
    } else if (
      this.state.cytoscapeElems.edges.length == 0 &&
      this.state.cytoscapeElems.nodes.length != 0 &&
      this.state.loadSuccesful == true
    ) {
      return (
        <div className={styles.noDataScreen}>
          <span>no data available for the selected score channels...</span>
        </div>
      );
    } else if (
      this.state.cytoscapeElems != undefined &&
      this.state.loadSuccesful == true
    ) {
      return (
        <CytoscapePanel
          elements={this.state.cytoscapeElems}
          queryGene={this.state.queryGene}
          showSecInteractions={this.state.showSecInteractions}
          showExpressionData={this.state.showExpressionData}
          selectedStructure={this.state.selectedStructure}
          selectedStage={this.state.selectedStage}
          aboveThreshold={this.state.aboveThreshold}
          keepNodes={this.state.keepNodes}
          selectedConfidence={this.state.selectedConfidence}
          nodesToDisplay={this.state.nodesToDisplay}
        />
      );
    }
  };

  // trigger onload AJAX call on mount
  componentDidMount() {
    this.loadCytoscapeData();
  }

  // handle option updates from OptionsPanel
  handleOptionUpdates = (optionStates) => {
    let optionIDs = optionStates.ids;
    let newOptionStates = {};

    optionIDs.forEach((id) => {
      newOptionStates[id] = optionStates[id];
    });

    this.setState(newOptionStates);
  };

  // handle reload graph request from RELOAD INTERACTION NETWORK button
  handleReloadInteractionNetwork = () => {
    this.ReloadCytoscapeData();
  };

  // render component
  // !!! React will try to re-render everything on every update which can cause an infinite loop
  renderCounter = 1;

  render() {
    // console.log(this.renderCounter);
    this.renderCounter += 1;

    return (
      <div className={styles.cytoscapePanel}>
        <div className={styles.cytoscapeContainer}>
          {this.handleCytoscapeLoad()}
        </div>

        <div className={styles.legendsContainer}>
          <Legends mode={this.state.showExpressionData ? "tpm" : "normal"} />
        </div>

        <div className={styles.optionsContainer}>
          <OptionsPanel
            onUpdate={this.handleOptionUpdates}
            reloadRequest={this.handleReloadInteractionNetwork}
            structuresInStages={this.state.structuresInStages}
          />
        </div>
      </div>
    );
  }
}

export default React.memo(MainPanel)

// ReactDOM.render(<MainPanel />, document.getElementById("root"));
