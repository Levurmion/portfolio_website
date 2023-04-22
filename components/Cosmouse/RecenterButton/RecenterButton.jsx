import React, { useState, useEffect } from "react";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import { motion } from "framer-motion";
import styles from './recenterButton.module.scss'

const RecenterButton = (props) => {

  let recenterButtonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "inherit",
    width: "inherit",
    borderRadius: "inherit",
    backgroundColor: "#00a897",
    zIndex: 9,
  };

  let centerFocusIconStyle = {
    display: "block",
    fontSize: "1.4vw",
    color: "#FFFFFF",
    zIndex: 9,
  };

  let recenterButtonShadowStyle = {
    transform: "translateY(0.3vh)",
    position: "absolute",
    display: "flex",
    height: "inherit",
    width: "inherit",
    borderRadius: "inherit",
    backgroundColor: "#c0c0c0",
    filter: "blur(0.1vw)",
    zIndex: 8,
  };

  let recenterButtonAnim = {
    showing: {
      y: "4.5vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "3.5vh",
      width: "3.5vh",
      margin: "0.75vh",
      borderRadius: "1.75vh",
      zIndex: 8,
    },
    hover: {
      scale: 1.08, 
      cursor: "pointer"
    },
    tap: {
      scale: 0.95,
      cursor: "pointer",
      transition: { duration: 0.1 },
    }
  }

  let handleButtonHover = () => {
    $('.recenter-button-label-text').toggleClass('hover')
  }

  return (
    <motion.div
      id={props.id}
      className={styles.recenterButtonWrapper}
      initial={false}
      exit={false}
      animate='showing'
      whileHover='hover'
      whileTap='tap'
      variants={recenterButtonAnim}
      onHoverStart={() => {handleButtonHover()}}
      onHoverEnd={() => {handleButtonHover()}}
      onClick={() => {props.notifyRecentre()}}
      >
      <div className={styles.recenterButton} style={recenterButtonStyle}>
        <CenterFocusWeakIcon style={centerFocusIconStyle} />
      </div>
      <div className={styles.recenterButtonShadow} style={recenterButtonShadowStyle}></div>
      <div className={styles.recenterButtonLabelText}><strong>RECENTRE</strong></div>
    </motion.div>
  );
};

export default RecenterButton;
