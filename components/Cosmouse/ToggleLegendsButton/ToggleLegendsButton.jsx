import React, { useState, useEffect } from 'react';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import styles from './toggleLegendsButton.module.scss';

function ToggleLegendsButton (props) {

  let [ viewMode, setViewMode ] = useState(props.viewEdges ? "EDGES" : "NODES");

  function handleOnClick () {

    if (viewMode == "NODES") {
      setViewMode("EDGES")
    } else if (viewMode == "EDGES") {
      setViewMode("NODES")
    }

    props.notifyClick()
  }

  return (
    <div className={styles.toggleLegendsSwitch} style={{color: '#FFFFFF'}} onClick={handleOnClick}>
      <SwapHorizIcon style={{fontSize: '0.8vw'}}/>
      <div style={{paddingLeft: '0.2vw'}}>{viewMode}</div>
    </div>
  )
}

export default ToggleLegendsButton