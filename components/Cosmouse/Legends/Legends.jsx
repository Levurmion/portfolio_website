import React, { Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import ToggleLegendsButton from "../ToggleLegendsButton/ToggleLegendsButton.jsx";
import InfoIcon from "@mui/icons-material/Info";
import DirectEdgeIcon from "./DIrectEdgeIcon.jsx";
import Tippy from "@tippy.js/react";
import Edge80 from "./Edge80.jsx";
import Edge60 from "./Edge60.jsx";
import EdgeLow from "./EdgeLow.jsx";
import styles from "./legends.module.scss";

class Legends extends Component {
  state = {
    mode: "normal",
    viewEdges: false,
    moreInfo: false,
    clickedNode: null,
    normalNodes: [
      { text: "QUERY", color: "#ee5d6c" },
      { text: "DIRECT", color: "#8e7fe3" },
      { text: "OTHERS", color: "#f5c889" },
    ],
    tpmNodes: [
      { text: "HIGH", color: "#178967" },
      { text: "MEDIUM", color: "#52ba69" },
      { text: "LOW", color: "#a2d88f" },
      { text: "EXPRESSED", color: "#368de3" },
      { text: "NO DATA", color: "#c2a5a5" },
    ],
  };

  legendsBoxAnim = {
    initial: {
      display: "none",
      position: "relative",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    showing: {
      position: "relative",
      alignSelf: "center",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      transition: {
        staggerChildren: 0.05,
      },
    },
    exit: {
      display: "none",
      position: "relative",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      transition: {
        staggerChildren: 0.05,
      },
    },
    initialMoreInfo: {
      display: "flex",
      position: "relative",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
    },
    moreInfo: {
      display: "flex",
      position: "relative",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
    },
    exitMoreInfo: {
      display: "flex",
      position: "relative",
      backgroundColor: "#FFFFFF",
      margin: "6px",
      height: "calc(100% - 12px)",
      width: "calc(100% - 12px)",
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "center",
    },
  };

  legendsNodeAnim = {
    initial: {
      scale: 0,
    },
    showing: {
      scale: 1,
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 17,
        },
      },
    },
    exit: {
      scale: 0,
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      },
    },
    initialMoreInfo: {
      scale: 0,
      width: "auto",
    },
    moreInfo: {
      scale: 1,
      width: "auto",
      marginInline: "2vh",
    },
    exitMoreInfo: {
      scale: 0,
      width: "auto",
      marginInline: "0vh",
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      },
    },
  };

  legendsEdgesAnim = {
    initial: {
      scale: 0,
      y: "1.2vh",
    },
    showing: {
      scale: 1,
      y: "1.2vh",
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 17,
        },
      },
    },
    exit: {
      scale: 0,
      y: "1.2vh",
      transition: {
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
      },
    },
  };

  infoTextAnim = {
    initialMoreInfo: {
      opacity: 0,
    },
    moreInfo: {
      opacity: [0, 0, 0, 1],
      transition: {
        duration: 0.3,
      },
    },
    exitMoreInfo: {
      opacity: [1, 0, 0, 0],
      transition: {
        duration: 0.3,
      },
    },
  };

  infoTextStyle = {
    height: "100%",
    width: "auto",
    display: "flex",
    fontSize: "0.95vw",
    justifyContent: "center",
    marginInlineEnd: "0.8vw",
    flexDirection: "column",
  };

  legendsDescription = {
    QUERY: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='query-info-wrapper'>
        <span class='legend-info' id='query-info'>
          Your selected gene at the center of the current network. Additional
          nodes are added by descending priority of their interaction confidence
          with this gene.
        </span>
      </motion.div>
    ),
    DIRECT: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='direct-info-wrapper'>
        <span class='legend-info' id='direct-info'>
          Genes exhibiting a direct interaction with the query given the
          specified interaction confidence threshold.
        </span>
      </motion.div>
    ),
    OTHERS: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='others-info-wrapper'>
        <span class='legend-info' id='others-info'>
          Genes exhibiting no direct interaction with the query given the
          specified interaction confidence threshold.
        </span>
      </motion.div>
    ),
    HIGH: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='highTPM-info-wrapper'>
        <span
          class='legend-info'
          id='highTPM-info'
          style={{ fontSize: "1.1vw" }}>
          <strong>&gt; 100 TPM (transcripts per million)</strong>
        </span>
        <span class='legend-info-plus' id='highTPM-info-plus'>
          Genes detected by RNA-Seq studies with expression levels beyond 100
          TPM.
        </span>
      </motion.div>
    ),
    MEDIUM: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='medTPM-info-wrapper'>
        <span
          class='legend-info'
          id='medTPM-info'
          style={{ fontSize: "1.1vw" }}>
          <strong>&gt; 10 TPM (transcripts per million)</strong>
        </span>
        <span class='legend-info-plus' id='medTPM-info-plus'>
          Genes detected by RNA-Seq studies with expression levels between 10
          and 100 TPM.
        </span>
      </motion.div>
    ),
    LOW: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='lowTPM-info-wrapper'>
        <span
          class='legend-info'
          id='lowTPM-info'
          style={{ fontSize: "1.1vw" }}>
          <strong>&gt; 0.5 TPM (transcripts per million)</strong>
        </span>
        <span class='legend-info-plus' id='lowTPM-info-plus'>
          Genes detected by RNA-Seq studies with expression levels above the
          cutoff (0.5 TPM) but less than 10 TPM.
        </span>
      </motion.div>
    ),
    EXPRESSED: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='expressed-info-wrapper'>
        <span class='legend-info' id='expressed-info'>
          Genes without RNA-Seq data but were detected to be expressed by other
          techniques.
        </span>
      </motion.div>
    ),
    NO_DATA: (
      <motion.div
        class='info-wrapper'
        style={this.infoTextStyle}
        variants={this.infoTextAnim}
        id='noData-info-wrapper'>
        <span class='legend-info' id='noData-info'>
          Genes with no expression data or are not expressed in the selected
          developmental stage or structure.
        </span>
      </motion.div>
    ),
  };

  tippyContent = (
    <div id='secondaryInteractions-info'>
      <div>
        Click on the displayed icons for more information.
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "0.3vh",
          marginBottom: "0.3vh",
          borderRadius: "4px",
          backgroundColor: "#eeaf61",
          paddingTop: "0.4vh",
          paddingBottom: "0.4vh",
          paddingInline: "0.4vw",
        }}>
        <strong>DIRECT INTERACTIONS</strong>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "0.3vh",
          marginBottom: "0.3vh",
          borderRadius: "4px",
          backgroundColor: "#a1a1a1",
          paddingTop: "0.4vh",
          paddingBottom: "0.4vh",
          paddingInline: "0.4vw",
        }}>
        <strong>SECONDARY INTERACTIONS</strong>
      </div>
    </div>
  );

  // ----------------------------------- EVENT HANDLERS -----------------------------------

  handleNodeClick = (event) => {
    let clickedNodeID = this.state.moreInfo ? null : event.target.id;

    this.setState({
      moreInfo: !this.state.moreInfo,
      clickedNode: clickedNodeID,
    });
  };

  handleToggleLegendsButtonClick = () => {
    this.setState({
      viewEdges: !this.state.viewEdges,
    });
  };

  // ----------------------------------- RENDERING FUNCTIONS -----------------------------------

  // each node is wrapped in a div with its shadow and text
  renderNode = (text, color) => {
    return (
      <motion.div
        layout
        key={text}
        className={
          this.state.moreInfo
            ? styles.legendsNodeWrapper + styles.moreInfo
            : styles.legendsNodeWrapper
        }
        variants={this.legendsNodeAnim}>
        <div
          className={styles.legendsNode}
          id={text}
          style={{ backgroundColor: color }}
          onClick={this.handleNodeClick}>
          <motion.div
            initial={false}
            animate={
              this.state.moreInfo
                ? {
                    opacity: 0.2,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    transform: "translateX(1%)",
                  }
                : { display: "none" }
            }
            exit={false}
            whileHover={
              this.state.moreInfo
                ? { opacity: 0.8, transform: "translateX(-2%)" }
                : { display: "none" }
            }>
            <KeyboardBackspaceRoundedIcon
              style={{ color: "#FFFFFF", fontSize: "2.2vw", margin: "0.5vw" }}
            />
          </motion.div>
        </div>
        <div className={styles.legendsNodeShadow}></div>
        <div className={styles.legendsNodeText}>{text}</div>
      </motion.div>
    );
  };

  renderNodes = (mode) => {
    return this.state[mode + "Nodes"].map((node) => {
      return this.renderNode(node.text, node.color);
    });
  };

  renderMoreInfoNode = (clickedNode) => {
    let nodeStyleRef = this.state[this.state.mode + "Nodes"].filter((node) => {
      return node["text"] === clickedNode;
    });

    console.log(nodeStyleRef);

    return this.renderNode(clickedNode, nodeStyleRef[0].color);
  };

  renderInfoText = () => {
    return this.legendsDescription[this.state.clickedNode.replace(" ", "_")];
  };

  renderEdges = () => {
    let LegendEdges = [
      <motion.div
        key='edge80'
        className={styles.legendEdges}
        variants={this.legendsEdgesAnim}>
        <Edge80 fontSize='7.5vh' />
        <div className={styles.legendEdgesText}>&gt; 0.7</div>
      </motion.div>,
      <motion.div
        key='edge60'
        className={styles.legendEdges}
        variants={this.legendsEdgesAnim}>
        <Edge60 fontSize='7.5vh' />
        <div className={styles.legendEdgesText}>&gt; 0.4</div>
      </motion.div>,
      <motion.div
        key='edgeLow'
        className={styles.legendEdges}
        variants={this.legendsEdgesAnim}>
        <EdgeLow fontSize='7.5vh' />
        <div className={styles.legendEdgesText}>&lt; 0.4</div>
      </motion.div>,
    ];

    return LegendEdges.map((edge) => {
      return edge;
    });
  };

  renderLegends = (mode) => {
    if (this.state.viewEdges == true) {
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            layout
            className={styles.legendsBox}
            key='viewEdges'
            initial='initial'
            animate='showing'
            exit='exit'
            variants={this.legendsBoxAnim}>
            <motion.div
              key='legendTitle'
              variants={{
                initial: { opacity: 1 },
                showing: { opacity: 1 },
                exit: { opacity: 1 },
              }}
              style={{
                display: "flex",
                position: "absolute",
                alignSelf: "start",
                marginTop: "0.5vh",
                marginInlineStart: "0.6vw",
                fontSize: "1.1vw",
                alignItems: "center",
              }}>
              <Tippy
                content={this.tippyContent}
                placement='left'
                animation='shift-away'
                delay={[500, 0]}
                allowHTML={true}
                distance={10}
                theme='scoreInfo'>
                <InfoIcon
                  style={{
                    fontSize: "1vw",
                    color: "#007a70",
                    marginInlineEnd: "0.2vw",
                    zIndex: 10
                  }}
                />
              </Tippy>
              <strong>LEGENDS</strong>
              <ToggleLegendsButton
                viewEdges={this.state.viewEdges}
                notifyClick={this.handleToggleLegendsButtonClick}
              />
            </motion.div>
            {this.renderEdges()}
          </motion.div>
        </AnimatePresence>
      );
    } else if (!this.state.moreInfo) {
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            layout
            className={styles.legendsBox}
            key={mode + this.state.clickedNode}
            initial='initial'
            animate='showing'
            exit='exit'
            variants={this.legendsBoxAnim}>
            <motion.div
              key='legendTitle'
              variants={{
                initial: { opacity: 1 },
                showing: { opacity: 1 },
                exit: { opacity: 1 },
              }}
              style={{
                display: "flex",
                position: "absolute",
                alignSelf: "start",
                marginTop: "0.5vh",
                marginInlineStart: "0.6vw",
                fontSize: "1.1vw",
                alignItems: "center",
              }}>
              <Tippy
                content={this.tippyContent}
                placement='left'
                animation='shift-away'
                delay={[500, 0]}
                allowHTML={true}
                distance={10}
                theme='scoreInfo'>
                <InfoIcon
                  style={{
                    fontSize: "1vw",
                    color: "#007a70",
                    marginInlineEnd: "0.2vw",
                    zIndex: 10,
                  }}
                />
              </Tippy>
              <strong>LEGENDS</strong>
              <ToggleLegendsButton
                viewEdges={this.state.viewEdges}
                notifyClick={this.handleToggleLegendsButtonClick}
              />
            </motion.div>
            {this.renderNodes(mode)}
          </motion.div>
        </AnimatePresence>
      );
    } else if (this.state.moreInfo) {
      console.log("moreInfo mode");
      return (
        <AnimatePresence mode='wait'>
          <motion.div
            layout
            className={styles.legendsBox}
            key={mode + this.state.clickedNode}
            initial='initialMoreInfo'
            animate='moreInfo'
            exit='exitMoreInfo'
            variants={this.legendsBoxAnim}>
            <motion.div
              key='legendTitle'
              variants={{
                initialMoreInfo: { opacity: 1 },
                moreInfo: { opacity: 0 },
                exitMoreInfo: { opacity: [0, 1] },
              }}
              style={{
                display: "flex",
                position: "absolute",
                alignSelf: "start",
                marginTop: "0.5vh",
                marginInlineStart: "0.6vw",
                fontSize: "1.1vw",
                alignItems: "center",
              }}>
              <InfoIcon
                style={{
                  fontSize: "1vw",
                  color: "#007a70",
                  marginInlineEnd: "0.2vw",
                }}
              />
              <strong>LEGENDS</strong>
              <ToggleLegendsButton
                viewEdges={this.state.viewEdges}
                notifyClick={this.handleToggleLegendsButtonClick}
              />
            </motion.div>
            {this.renderMoreInfoNode(this.state.clickedNode)}
            {this.renderInfoText()}
          </motion.div>
        </AnimatePresence>
      );
    }
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.mode != this.props.mode) {
      this.setState({
        mode: this.props.mode,
        moreInfo: false,
      });
    }
  }

  render() {
    console.log(this.tippyContent);
    return this.renderLegends(this.state.mode);
  }
}

export default Legends;
