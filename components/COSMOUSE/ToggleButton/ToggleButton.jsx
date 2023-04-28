import { useState } from "react";
import styles from './ToggleButton.module.scss'

function ToggleButton({ defText, altText, fontSize, notifyToggle}) {

   const [toggle, setToggle] = useState(true)

   function handleClick(event) {
      setToggle(state => !state)
      notifyToggle()
   }

   return ( 
      <div onClick={handleClick} className={styles.buttonWrapper} style={{ fontSize }}>
         <span>{toggle ? defText : altText}</span>
      </div>
   );
}

export default ToggleButton;