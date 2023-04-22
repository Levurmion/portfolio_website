import React, { Component } from "react";
import Tippy from "@tippy.js/react";
import styles from "./scoresheet.module.scss";
import "tippy.js/dist/tippy.css";
import $ from 'jquery';

class Scoresheet extends Component {
  // each checkbox keeps track of its own CHECKED/UNCHECKED state, state just carries the popup messages
  state = {
    popupMessage: {
      score: <div id="scores-info" className={styles.scoresInfo}><span> aggregate score from all available score channels </span></div>,
      nscore: <div id="nscores-info" className={styles.nscoresInfo}><span>Groups of genes that are frequently observed in each other's genomic neighborhood. </span></div>,
      fscore: <div id='fscores-info' className={styles.fscoresInfo}><span>Genes that are sometimes fused into single open reading frames. </span></div>,
      pscore: <div id='pscores-info' className={styles.pscoresInfo}><span>Gene families whose occurrence pattern show similarities across genomes. </span></div>,
      ascore: <div id='ascores-info' className={styles.ascoresInfo}><span>Genes that are often co-expressed in a species. </span></div>,
      escore: <div id='escores-info' className={styles.escoresInfo}><span>Evidence obtained by experimental studies in primary sources.</span></div>,
      dscore: <div id='dscores-info' className={styles.dscoresInfo}><span>Gene involvement in protein complexes and metabolic pathways from curated databases. </span></div>,
      tscore: <div id='tscores-info' className={styles.tscoresInfo}><span>Score derived from the co-citation of genes by automated, unsupervised text-mining. </span></div>
    }
  }


  // check if all boxes are checked with onClick, if so, also check the checkAllBox
  checkCheckAllBox = () => {
    let checkAllBoxIdx = this.props.scoreChannels.indexOf(
      this.props.checkAllBox
    );
    let specificScoreChannels = [...this.props.scoreChannels];
    specificScoreChannels.splice(checkAllBoxIdx, 1);

    let shouldCheckCheckAllBox = specificScoreChannels.every((scoreChannel) => {
      return $("#" + scoreChannel + "-checkbox").is(":checked");
    });

    if (shouldCheckCheckAllBox == true) {
      $("#" + this.props.checkAllBox + "-checkbox").prop("checked", true);
    } else {
      $("#" + this.props.checkAllBox + "-checkbox").prop("checked", false);
    }
  };

  // uncheck all boxes ONLY IF checkAllBox unchecked by onClick
  handleOnClick = (event) => {
    // if checkAllBox is clicked and it is checked, check all other boxes
    if (
      event.target.id == `${this.props.checkAllBox}-checkbox` &&
      $(`#${this.props.checkAllBox}-checkbox`).is(":checked")
    ) {
      this.props.scoreChannels.forEach((scoreChannel) => {
        $("#" + scoreChannel + "-checkbox").prop("checked", true);
      });
      // if checkAllBox is clicked and it is unchecked, uncheck all other boxed
    } else if (
      event.target.id == `${this.props.checkAllBox}-checkbox` &&
      $(`#${this.props.checkAllBox}-checkbox`).not(":checked")
    ) {
      this.props.scoreChannels.forEach((scoreChannel) => {
        $("#" + scoreChannel + "-checkbox").prop("checked", false);
      });
      // else, check if all the other boxes are checked - if so, also check the checkAllBox
    } else {
      this.checkCheckAllBox();
    }

    let newScoresheet = this.props.scoreChannels.filter((scoreChannel) => {
      return $(`#${scoreChannel}-checkbox`).is(":checked");
    });

    // lift button states to OptionsPanel
    this.props.onCheckUncheck(newScoresheet);
  };

  // generate score states
  componentDidMount() {
    this.props.scoreChannels.forEach((scoreChannel) => {
      $(`#${scoreChannel}-checkbox`).prop("checked", true);
    });
  }

  render() {
    return (
      <div className={styles.scoresheet} id={this.props.id}>
        <span className={styles.scoresheetLabel}>
          <strong>{this.props.label}</strong>
        </span>
        <div className={styles.scoresheetCheckboxes}>
          {this.props.scoreChannels.map((scoreChannel) => {
            return (
              <Tippy
                content={this.state.popupMessage[scoreChannel]}
                placement='left'
                animation='shift-away'
                delay={[500,0]}
                allowHTML={true}
                distance={15}
                theme='scoreInfo'>
                <div
                  className={styles.checkboxRow}
                  id={scoreChannel}
                  data-tippy-content
                  data-template='scores-info'>
                  <input
                    className={styles.checkbox}
                    type='checkbox'
                    name={scoreChannel}
                    id={scoreChannel + "-checkbox"}
                    value={scoreChannel}
                    onClick={this.handleOnClick}
                  />
                  <label for={scoreChannel} id={scoreChannel + "-label"}>
                    {this.props.scoreDesc[scoreChannel]}
                  </label>
                </div>
              </Tippy>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Scoresheet;
