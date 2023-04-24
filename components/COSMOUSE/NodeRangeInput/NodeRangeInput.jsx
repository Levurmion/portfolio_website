import { useEffect, useState, useRef } from 'react';
import styles from './NodeRangeInput.module.scss'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


function NodeRangeInput({ labelText, fontSize, range, notifyChange }) {

   const [value, setValue] = useState(10)
   let interval = null

   function handleIncrement() {
      const newValue = value + (value < range[1] ? 1 : 0)
      setValue(newValue)
      notifyChange(newValue)
   }

   function handleDecrement() {
      const newValue = value - (value > range[0] ? 1 : 0)
      setValue(newValue)
      notifyChange(newValue)
   }

   return ( 
      <div className={styles.inputContainer} style={{fontSize}}>
         <span>{labelText}</span>
         <div className={styles.numberInput}>
            <div className={styles.valueDisplay}><span>{value}</span></div>
            <div className={styles.incrementButtons}>
               <div className={styles.upArrow} onClick={handleIncrement}><ArrowDropUpIcon fontSize='40%'/></div>
               <div className={styles.downArrow} onClick={handleDecrement}><ArrowDropDownIcon fontSize='40%'/></div>
            </div>
         </div>
      </div>
    );
}

export default NodeRangeInput;