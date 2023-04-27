import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './NodeRangeInput.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


function NodeRangeInput({ labelText, fontSize, range, notifyChange }) {

   const [value, setValue] = useState(10)
   const [isMouseDown, setIsMouseDown] = useState(false);
   const intervalDelayRef = useRef(null)
   const incIntervalRef = useRef(null)
   const decIntervalRef = useRef(null)

   const initIncInterval = () => {
      incIntervalRef.current = setInterval(handleIncrease, 75)
   }

   const initDecInterval = () => {
      decIntervalRef.current = setInterval(handleDecrease, 75)
   }

   const handleIncrease = () => {
      setValue(prevValue => prevValue + (prevValue < range[1] ? 1 : 0))
   }

   const handleDecrease = () => {
      setValue(prevValue => prevValue - (prevValue > range[0] ? 1 : 0))
   }

   const handleIncMouseDown = () => {
      setIsMouseDown(true)
      intervalDelayRef.current = setTimeout(initIncInterval, 250)
   }

   const handleIncMouseUp = () => {
      setIsMouseDown(false)
      clearInterval(incIntervalRef.current)
      clearTimeout(intervalDelayRef.current)
   }

   const handleDecMouseDown = () => {
      setIsMouseDown(true)
      intervalDelayRef.current = setTimeout(initDecInterval, 250)
   }
   
   const handleDecMouseUp = () => {
      setIsMouseDown(false)
      clearInterval(decIntervalRef.current)
      clearTimeout(intervalDelayRef.current)
   }

   const handleMouseLeave = () => {
      clearTimeout(intervalDelayRef.current)
      if (isMouseDown) {
         setIsMouseDown(false)
         clearInterval(incIntervalRef.current)
         clearInterval(decIntervalRef.current)
      }
   }

   useEffect(() => {
      notifyChange(value)
   }, [value])

   return ( 
      <div className={styles.inputContainer} style={{fontSize}}>
         <span>{labelText}</span>
         <div className={styles.numberInput}>
            <div className={styles.valueDisplay}><span>{value}</span></div>
            <div className={styles.adjustButtons}>
               <div className={styles.upArrow} onMouseLeave={handleMouseLeave} onClick={handleIncrease} onMouseDown={handleIncMouseDown} onMouseUp={handleIncMouseUp}><ArrowDropUpIcon fontSize='40%'/></div>
               <div className={styles.downArrow} onMouseLeave={handleMouseLeave} onClick={handleDecrease} onMouseDown={handleDecMouseDown} onMouseUp={handleDecMouseUp}><ArrowDropDownIcon fontSize='40%'/></div>
            </div>
         </div>
      </div>
    );
}

export default NodeRangeInput;