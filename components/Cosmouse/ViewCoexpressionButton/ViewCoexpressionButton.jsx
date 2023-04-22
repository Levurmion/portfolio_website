import React, { useState, useEffect } from "react";
import SsidChartIcon from '@mui/icons-material/SsidChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import { motion } from "framer-motion";
import styles from './viewCoexpressionButton.module.scss'
import $ from 'jquery';

const viewCoexpressionButton = (props) => {

  let [viewTarget ,  setViewTarget] = useState("COMPARE EXPRESSION");

  let viewCoexpressionButtonStyle = {
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

  let viewCoexpressionButtonShadowStyle = {
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

  let viewCoexpressionButtonAnim = {
    showing: {
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
    $('.coexpression-button-label-text').toggleClass('hover')
  }

  let handleOnClick = () => {
    // alert('clicked')
    let buttonText = viewTarget == "COMPARE EXPRESSION" ? "QUERY EXPRESSION" : "COMPARE EXPRESSION";
    $('.coexpression-button-label-text').toggleClass('hover')
    setViewTarget(buttonText);
    props.notifyClick()
  }

  return (
    <motion.div
      id={props.id}
      className={styles.coexpressionButtonWrapper}
      initial={false}
      exit={false}
      animate='showing'
      whileHover='hover'
      whileTap='tap'
      variants={viewCoexpressionButtonAnim}
      onHoverStart={() => {handleButtonHover()}}
      onHoverEnd={() => {handleButtonHover()}}
      onClick={handleOnClick}
      // onTap={handleOnClick}
      >
      <div className={styles.coexpressionButton} style={viewCoexpressionButtonStyle}>
        {viewTarget == "COMPARE EXPRESSION" ? <SsidChartIcon style={centerFocusIconStyle} /> : <BarChartIcon style={centerFocusIconStyle} /> }
      </div>
      <div className={styles.coexpressionButtonShadow} style={viewCoexpressionButtonShadowStyle}></div>
      <div className={styles.coexpressionButtonLabelText}><strong>{viewTarget}</strong></div>
    </motion.div>
  );
};

export default viewCoexpressionButton;
