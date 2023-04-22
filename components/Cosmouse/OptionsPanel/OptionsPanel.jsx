import React, { Component } from "react";
import Tippy from "@tippy.js/react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import Dropdown from "../Dropdown/Dropdown.jsx";
import Slider from "../Slider/Slider.jsx";
import ToggleButton from "../ToggleButton/ToggleButton.jsx";
import Scoresheet from "../Scoresheet/Scoresheet.jsx";
import NodesToDisplay from "../NodesToDisplay/NodesToDisplay.jsx";
import AJAXButton from "../AJAXButton/AJAXButton.jsx";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import styles from "./optionsPanel.module.scss";

class OptionsPanel extends Component {
  // only collects information from all option menus and bubbles them to MainPanel

  state = {
    // DATA STATES
    ids: [
      "showSecInteractions",
      "showExpressionData",
      "selectedStage",
      "selectedStructure",
      "selectedConfidence",
      "aboveThreshold",
      "keepNodes",
      "scoreChannels",
      "nodesToDisplay",
    ],
    structuresInStages: this.props.structuresInStages,

    // OPTION STATES
    showSecInteractions: true,
    showExpressionData: false,
    selectedStage: 1,
    selectedStructure: "Max TPM (any structure)",
    selectedConfidence: 0.4,
    aboveThreshold: true,
    keepNodes: true,
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

    // UPDATE MAIN PANEL
    updateMainPanel: false,
  };

  // TOOLTIP MESSAGE CONTENTS
  tooltipContents = {
    confidence: (
      <div id='confidence-info'>
        <div>
          Adjust the slider to select a confidence threshold to filter interactions.
        </div>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '0.3vh', marginBottom: '0.3vh', borderRadius: '4px', backgroundColor: '#015952', paddingTop: '0.4vh', paddingBottom: '0.4vh', paddingInline: '0.4vw'}}><strong>ALL NODES</strong> display all nodes</div>
        <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '0.3vh', marginBottom: '0.3vh', borderRadius: '4px', backgroundColor: '#015952', paddingTop: '0.4vh', paddingBottom: '0.4vh', paddingInline: '0.4vw'}}><strong>DROP NODES</strong> remove nodes without interactions</div>
      </div>
    ),
    showSecInteractions: (
      <div id='secondaryInteractions-info'>
        Hide/show interactions between query interactors (grey edges). Explore the legends panel for more information.
      </div>
    ),
    showExpressionData: (
      <div id='expressionData-info'>
        Toggle to view expression data in a given body structure and developmental stage. Human data is only available for TS1-TS3. Explore the legends panel for more information.
      </div>
    )
  };

  // handle changes in toggle SWITCH states
  handleToggleSwitchState = (newState, id) => {
    this.setState({ [id]: newState });
  };

  // handle changes in toggle BUTTON states
  handleToggleButtonState = (newState, id) => {
    this.setState({ [id]: newState });
  };

  // handle changes in selected structure in dropdown
  handleStructureSelection = (structure) => {
    this.setState({ selectedStructure: structure });
  };

  // handle changes in slider value
  handleSliders = (newValue, id) => {
    let newStates = {};

    if (id == "selectedStage") {
      newStates[id] = newValue;
      newStates["selectedStructure"] = "Max TPM (any structure)";
    } else {
      newStates[id] = newValue;
    }

    this.setState(newStates);
  };

  // handle scoresheet updates
  handleScoresheet = (scoresheet) => {
    this.setState({ scoreChannels: scoresheet });
  };

  // handle node to display
  handleNodesToDisplay = (nodeCount) => {
    this.setState({ nodesToDisplay: nodeCount });
  };

  // handle AJAX button - just lift event to MainPanel
  handleAJAXButton = () => {
    this.props.reloadRequest();
  };

  // update props when new data comes in
  static getDerivedStateFromProps(props, state) {
    if (props.structuresInStages != state.structuresInStages) {
      return { structuresInStages: props.structuresInStages };
    } else {
    }
  }

  // whenever OptionsPanel updates, it re-renders children with new props, and bubbles its state to MainPanel by this.props.onUpdate
  componentDidUpdate() {
    if (this.state.structuresInStages == null) {
    } else {
      this.props.onUpdate(this.state);
    }
  }

  render() {
    return (
      <div className={styles.optionsPanel}>

        <ToggleSwitch
          id='showSecInteractions'
          className={styles.showSecInteractions}
          onToggle={this.handleToggleSwitchState}
          label='SHOW SECONDARY INTERACTIONS'
          default={this.state.showSecInteractions}
          tippyContent={this.tooltipContents.showSecInteractions}
        />
            
        <ToggleSwitch
          id='showExpressionData'
          className={styles.showExpressionData}
          onToggle={this.handleToggleSwitchState}
          label='SHOW EXPRESSION DATA'
          default={this.state.showExpressionData}
          tippyContent={this.tooltipContents.showExpressionData}
        />

        <Dropdown
          id='selectedStructure'
          className={styles.selectedStructure}
          dropdownOptions={
            this.state.structuresInStages == undefined ||
            this.state.structuresInStages[this.state.selectedStage] == undefined
              ? []
              : this.state.structuresInStages[this.state.selectedStage]
          }
          default='Max TPM (any structure)'
          onSelect={this.handleStructureSelection}
          enabled={this.state.showExpressionData == true ? "true" : "false"}
        />

        <Slider
          id='selectedStage'
          className={styles.selectedStage}
          min='1'
          max='26'
          step='1'
          defaultVal='1'
          displayText='TS'
          onSlide={this.handleSliders}
          enabled={this.state.showExpressionData == true ? "true" : "false"}
        />

        <Tippy
          content={this.tooltipContents.confidence}
          placement='left'
          animation='shift-away'
          delay={[500, 0]}
          allowHTML={true}
          distance={10}
          theme='scoreInfo'>
          <div id='confidence-label' className={styles.confidenceLabel} style={{display: 'flex', flexDirection: 'row', justifyContent: 'start', fontSize: '1.1vw'}}>
            <InfoRoundedIcon style={{fontSize: '1vw', color: '#007a70', marginInlineEnd: '0.2vw'}}/><strong>CONFIDENCE</strong>
          </div>
        </Tippy>


          <ToggleButton
            id='keepNodes'
            className={styles.keepNodes}
            onText='ALL NODES'
            offText='DROP NODES'
            onToggle={this.handleToggleButtonState}
          />


        <ToggleButton
          id='aboveThreshold'
          className={styles.aboveThreshold}
          onText='ABOVE'
          offText='BELOW'
          onToggle={this.handleToggleButtonState}
        />

        <Slider
          id='selectedConfidence'
          className={styles.selectedConfidence}
          min='0'
          max='0.999'
          step='0.001'
          defaultVal='0.40'
          displayText=''
          onSlide={this.handleSliders}
          enabled='true'
        />

        <NodesToDisplay
          id='nodesToDisplay'
          className={styles.nodesToDisplay}
          labelText='NODES TO DISPLAY'
          min='1'
          max='500'
          defaultVal='10'
          onNumberChange={this.handleNodesToDisplay}
        />

        <Scoresheet
          id='scoreChannels'
          className={styles.scoreChannels}
          label='SCORE CHANNELS'
          scoreChannels={[
            "score",
            "nscore",
            "fscore",
            "pscore",
            "ascore",
            "escore",
            "dscore",
            "tscore",
          ]}
          scoreDesc={{
            score: "cumulative score",
            nscore: "gene neighbourhood score",
            fscore: "fusion score",
            pscore: "phylogenetic profile score",
            ascore: "coexpression score",
            escore: "experimental score",
            dscore: "database score",
            tscore: "textmining score",
          }}
          checkAllBox='score'
          onCheckUncheck={this.handleScoresheet}
        />

        <AJAXButton
          id='reload-graph-button'
          className={styles.graphReloadButton}
          buttonText='RELOAD INTERACTION NETWORK'
          onReloadRequest={this.handleAJAXButton}
        />
      </div>
    );
  }
}

// React.memo() to prevent unnecessary re-renders when parent updates
export default React.memo(OptionsPanel);
