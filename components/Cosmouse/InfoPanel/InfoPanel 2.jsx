import React, { Component, useState } from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import BubbleChartRoundedIcon from '@mui/icons-material/BubbleChartRounded';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import InfoIcon from '@mui/icons-material/Info';
import "./InfoPanel.css";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

class InfoPanel extends Component {
  constructor() {
    super();

    this.state = {
      infoOpen: false,
      temporaryOpen: false,
      warningMode: false,
      ignoreWarning: false,
      wasClosedOnTimer: false
    };

    // animations
    this.infoButtonWrapper = {
      regular: {
        display: "flex",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: "3.5vh",
        width: "3.5vh",
        margin: "0.75vh",
        borderRadius: "50%",
        cursor: 'pointer',
        zIndex: 6,
      },
      hover: {
        scale: 1.1,
        position: 'relative',
        transition: {
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 18,
          }
        }
      },
      tap: {
        scale: 0.98,
        position: 'relative',
        transform: 'rotate(720deg)',
        transition: {
          scale: {
            type: 'spring',
            stiffness: 400,
            damping: 18,
          }
        }
      },
    };

    this.infoBoxWrapper = {
      initial: {
        display: 'flex',
        position: 'absolute',
        transform: 'translateY(2.25vh)',
        justifyContent: 'start',
        fontSize: '0vw',
        width: '0%',
        height: '8vh',
        marginLeft: "5vh",
        borderRadius: "1vh",
        alignItems: 'center',
        alignSelf: 'center',
      },
      showing: {
        display: 'flex',
        position: 'absolute',
        transform: 'translateY(2.25vh)',
        justifyContent: 'start',
        fontSize: '1vw',
        alignItems: 'center',
        alignSelf: 'center',
        margin: "0.75vh",
        marginLeft: "5vh",
        width: '90%',
        borderRadius: "1vh",
        height: '8vh',
        transition: {
          width: {
            type: 'spring',
            stiffness: 250,
            damping: 24,
          }
        }
      },
      exit: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'start',
        transform: 'translateY(2.25vh)',
        fontSize: ["1vw","0vw","0vw","0vw"],
        width: '0%',
        height: '8vh',
        marginLeft: "5vh",
        borderRadius: "1.75vh",
        alignItems: 'center',
        alignSelf: 'center',
        transition: {
          width: {
            type: 'spring',
            stiffness: 250,
            damping: 24,
          }
        }
      },
    }

    this.timer = {
      initial: {
        position: 'absolute',
        alignSelf: 'end',
        width: '80%',
        height: '5%',
        backgroundColor: '#00a897'
      },
      countdown: {
        position: 'absolute',
        alignSelf: 'end',
        width: '0%',
        height: '5%',
        backgroundColor: '#00a897',
        transition: {
          duration: 5
        }
      }
    }

    this.timerWarning = {
      initial: {
        position: 'absolute',
        alignSelf: 'end',
        width: '80%',
        height: '5%',
        backgroundColor: '#f23343'
      },
      countdown: {
        position: 'absolute',
        alignSelf: 'end',
        width: '0%',
        height: '5%',
        backgroundColor: '#f23343',
        transition: {
          duration: 5
        }
      }
    }

    // styles
    this.infoButtonStyle = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#00a897',
      zIndex: 6
    }

    this.infoButtonStyleWarning = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#f23343',
      zIndex: 6
    }

    this.infoButtonShadowStyle = {
      transform: 'translateY(0.3vh)',
      position: 'absolute',
      display: 'flex',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#c0c0c0',
      filter: 'blur(0.15vw)',
      zIndex: 5
    }

    this.infoBoxStyle = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#d0ffef',
      zIndex: 6
    }

    this.infoBoxStyleWarning = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#faafb5',
      zIndex: 6
    }

    this.infoBoxShadowStyle = {
      transform: 'translateY(0.3vh)',
      position: 'absolute',
      display: 'flex',
      height: 'inherit',
      width: 'inherit',
      borderRadius: 'inherit',
      backgroundColor: '#c0c0c0',
      filter: 'blur(0.15vw)',
      zIndex: 5
    }

    this.questionMarkIconStyle = {
      color: "#FFFFFF",
      fontSize: '1vw'
    };

    this.closeIconStyle = {
      color: '#FFFFFF',
      fontSize: '1vw'
    }

    this.errorIconStyle = {
      color: '#FFFFFF',
      fontSize: '1.4vw'
    }

    this.touchIconStyle = {
      color: '#006157',
      fontSize: '100%'
    }

    this.zoomIconStyle = {
      color: '#006157',
      fontSize: '100%'
    }

    this.bubbleIconStyle = {
      color: '#006157',
      fontSize: '100%'
    }

    this.infoIconStyle = {
      color: '#006157',
      fontSize: '100%'
    }

    this.ignoreButtonStyle = {
      color: '#fa0216',
      display: 'block',
      position: 'relative',
      textAlign: 'center',
      gridArea: '3/5/4/7',
      marginInline: '0.5vw',
      transform: 'translateY(-10%)',
      fontSize: '85%',
      cursor: 'pointer'
    }

    


  }

  handleOnClick = () => {

    if (this.state.temporaryOpen == true && this.state.infoOpen == true) {
      this.setState({
        infoOpen: false,
        temporaryOpen: false,
        wasClosedOnTimer: true
      })
      setTimeout(() => {
        this.setState({
          wasClosedOnTimer: false
        })
      },5000)
    } else if (this.state.infoOpen == true) {
      this.setState({
        infoOpen: false,
        temporaryOpen: false
      })
    } else if (this.state.infoOpen == false) {
      this.setState({
        infoOpen: true,
      })
    }
    
  }

  handleIgnore = () => {

    if (this.state.temporaryOpen == true && this.state.infoOpen == true) {
      this.setState({
        infoOpen: false,
        ignoreWarning: true,
        temporaryOpen: false,
        wasClosedOnTimer: true
      })
      setTimeout(() => {
        this.setState({
          wasClosedOnTimer: false
        })
      },5000)
    } else {
      this.setState({
        infoOpen: false,
        ignoreWarning: true,
        temporaryOpen: false,
      })
    }

  }

  renderInfoText = () => {
    console.log(this.props)
    if (this.props.warningMode == true && this.state.ignoreWarning == false) {
      return (
        <div style={{display: 'grid', gridTemplateColumn: 'repeat(6, 1fr)', gridTemplateRows: 'repeat(3, 1fr)'}}>
          <div style={{gridArea: '1/1/4/7',padding: '0.8vw', fontSize: '85%'}}>Fetching and displaying a large number of nodes will negatively affect performance. Drop lone nodes at high confidence thresholds to improve render times.</div>
          <div style={this.ignoreButtonStyle} onClick={this.handleIgnore}><strong>IGNORE</strong></div>
        </div>
      )
    } else if (this.props.infoMode == "normal") {
      return (
        <div>
          <div><TouchAppRoundedIcon style={this.touchIconStyle}/>  Click on edges to view interaction confidence.</div>
          <div><ZoomOutMapIcon style={this.zoomIconStyle}/>  Scroll/pinch to zoom in/out of the graph.</div>
        </div>
      )
    } else if (this.props.infoMode == "tpm") {
      return (
        <div>
          <div><BubbleChartRoundedIcon style={this.bubbleIconStyle}/>  Node sizes correspond to TPM levels for visibility.</div>
          <div><InfoIcon style={this.infoIconStyle}/>  Hover to view TPM value for the selected stage and structure. </div>
        </div>
      )
    }
  }

  
  renderInfoBox = () => {

    if (this.state.infoOpen == true) {
      return (
        <motion.div 
          className="info-box-wrapper" 
          initial={this.infoBoxWrapper.initial}
          animate={this.infoBoxWrapper.showing}
          exit={this.infoBoxWrapper.exit}
        >
          <div className='info-box' style={this.state.warningMode && !this.state.ignoreWarning ? this.infoBoxStyleWarning : this.infoBoxStyle}>
            {this.renderInfoText()}
            {this.state.temporaryOpen == true ? 
            <motion.div 
            className="timer" 
            initial={this.state.warningMode && !this.state.ignoreWarning ? this.timerWarning.initial : this.timer.initial} 
            animate={this.state.warningMode && !this.state.ignoreWarning ? this.timerWarning.countdown : this.timer.countdown}/>
            : ""}
          </div>
          <div className="info-box-shadow" style={this.infoBoxShadowStyle}></div>
        </motion.div>
      )
    } else {}

  }


  // REACT COMPONENT LIFECYCLE HOOKS

  // onMount, show the menu
  componentDidMount() {
    this.setState({
      infoOpen: true,
      temporaryOpen: true
    })
  }

  // if this.props.infoMode changes, open the panel
  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevProps.infoMode != this.props.infoMode && this.state.infoOpen == false) {
      
      if (this.state.temporaryOpen == true && this.state.infoOpen == true) {
        this.setState({
          wasClosedOnTimer: true,
        });
        setTimeout(() => {
          this.setState({
            wasClosedOnTimer: false
          })
        },5000);
      }

      this.setState({
        infoOpen: true,
        temporaryOpen: true
      })
    }

    if (this.state.temporaryOpen == true) {
      setTimeout(() => {
        if (this.state.temporaryOpen == true && this.state.wasClosedOnTimer == false) {
          this.setState({
            infoOpen: false,
            temporaryOpen: false,
            wasClosedOnTimer: false
          })
        }
      },5000)
    }

    if (this.props.warningMode == true && this.state.warningMode == false) {
      this.setState({ 
        infoOpen: true,
        warningMode: true, 
        temporaryOpen: true
      })
    } else if (this.props.warningMode == false && this.state.warningMode == true && this.state.infoOpen == true) {

      this.setState({ 
        warningMode: false,
        infoOpen: false,
        temporaryOpen: false,
        ignoreWarning: false,
        wasClosedOnTimer: true
      })

      setTimeout(() => {
        this.setState({
          wasClosedOnTimer: false
        })
      },5000);
      
    } else if (this.props.warningMode == false && this.state.warningMode == true) {

      this.setState({ 
        warningMode: false,
        infoOpen: false,
        temporaryOpen: false,
        ignoreWarning: false,
      })
    }


  }

  componentDidUpdate() {
    console.log(this.state)
  }


  render() {
    return (
      <div className='info-panel-wrapper'>
        <motion.div
          className='info-button-wrapper'
          initial={false}
          animate={this.infoButtonWrapper.regular}
          whileHover={this.infoButtonWrapper.hover}
          whileTap={this.infoButtonWrapper.tap}
          onClick={this.handleOnClick}
        >
          <div className="info-button" style={this.state.warningMode && !this.state.ignoreWarning ? this.infoButtonStyleWarning : this.infoButtonStyle}>
            {this.state.warningMode && !this.state.ignoreWarning ? <ErrorOutlineOutlinedIcon style={this.errorIconStyle}/> : (this.state.infoOpen == true ? <CloseRoundedIcon style={this.closeIconStyle}/> : <QuestionMarkIcon style={this.questionMarkIconStyle}/> )}
          </div>
          <div className="info-button-shadow" style={this.infoButtonShadowStyle}></div>
        </motion.div>

        <AnimatePresence>
          {this.renderInfoBox()}
        </AnimatePresence>

      </div>
    );
  }
}

export default InfoPanel;
