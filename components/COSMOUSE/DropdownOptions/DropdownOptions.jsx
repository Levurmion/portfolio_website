import styles from "./DropdownOptions.module.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { uniqueKeyGenerator } from "../../../lib/utilities.mjs";
import { motion, AnimatePresence, transform } from "framer-motion";
import { useState, useEffect } from "react";

const dropdownIntialAnim = {
   height: "0px",
};

const dropdownOpenAnim = {
   height: "20vh",
   transition: {
      type: "tween",
      duration: 0.1
   },
};

const dropdownCloseAnim = {
   height: "0px",
   transition: {
      type: 'tween',
      duration: 0.1
   }
};

function DropdownOptions({ options, fontSize, notifySelect }) {

   const [showDropdown, setShowDropdown] = useState(false);
   const [displayedOption, setDisplayedOption] = useState(options[0]);

   function handleExpandDropdown() {
      setShowDropdown(!showDropdown);
   }

   function handleListClick(event) {
      setDisplayedOption(event.target.id);
      setShowDropdown(false);
      notifySelect(event.target.id)
   }

   function renderOptionsList() {
      const keyGenerator = uniqueKeyGenerator();

      return (
         <motion.div key='dropdown' initial={dropdownIntialAnim} animate={dropdownOpenAnim} exit={dropdownCloseAnim} className={styles.optionsContainer}>
            <PerfectScrollbar>
               <ul className={styles.optionsList}>
                  {options.map((option) => (
                     <li key={keyGenerator(option)} id={option} onClick={handleListClick}>
                        {option}
                     </li>
                  ))}
               </ul>
            </PerfectScrollbar>
         </motion.div>
      );
   }

   useEffect(() => {
      setDisplayedOption(options[0])
   }, [options]);

   return (
      <div className={styles.dropdownWrapper} style={{ fontSize }}>
         <div className={styles.dropdownDisplay}>
            <div className={styles.dropdown}>{displayedOption}</div>
            <div className={styles.expandDropdown} onClick={handleExpandDropdown}>
               <motion.div className={styles.iconContainer} initial={false} animate={showDropdown ? {transform: 'rotate(180deg)'} : {}} transition={{duration: 0.2}}>
                  <ExpandMoreIcon fontSize='inherit' />
               </motion.div>
            </div>
         </div>
         <AnimatePresence mode='wait'>
            {showDropdown ? renderOptionsList() : <div key='dummy'></div>}
         </AnimatePresence>
      </div>
   );
}

export default DropdownOptions;
