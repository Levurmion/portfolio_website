import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./ToggleSwitch.module.scss";

// needs a wrapper
function ToggleSwitch({ label, defaultState, textColor, fontSize}) {
   const toggleSwitchBodyRef = useRef(null);
   const switchWrapperRef = useRef(null);
   const switchLabelRef = useRef(null);
   const switchThumbRef = useRef(null);

   const [active, setActive] = useState(defaultState);

   function handleSwitchClick() {
      setActive(!active);
   }

   useLayoutEffect(() => {
      const switchHeight = toggleSwitchBodyRef.current.getBoundingClientRect().height;
      const thumbHeight = switchThumbRef.current.getBoundingClientRect().height;
      const switchWidth = switchHeight * 1.6;

      toggleSwitchBodyRef.current.style.width = String(`${switchWidth}px`);
      toggleSwitchBodyRef.current.style.borderRadius = String(`${switchHeight / 2}px`);

      switchThumbRef.current.style.width = String(`${thumbHeight}px`);

      if (label === undefined) {
         switchWrapperRef.current.style.justifyContent = "center";
      } else {
         const labelFontSize = switchHeight * 0.65;

         switchWrapperRef.current.style.justifyContent = "space-between";

         if (fontSize === undefined) {
            switchLabelRef.current.style.fontSize = `${labelFontSize}px`;
         } else {
            switchLabelRef.current.style.fontSize = fontSize;
         }
         
      }
   }, []);

   return (
      <div className={styles.switchWrapper} ref={switchWrapperRef}>
         {label !== undefined ? (
            <div className={styles.switchLabel} ref={switchLabelRef} style={{ color: textColor }}>
               {label}
            </div>
         ) : (
            ""
         )}
         <div
            onClick={handleSwitchClick}
            style={active ? switchStyle.active : switchStyle.inactive}
            className={styles.toggleSwitchBody}
            ref={toggleSwitchBodyRef}>
            <motion.div layout style={active ? thumbStyle.active : thumbStyle.inactive} className={styles.toggleSwitchThumb} ref={switchThumbRef} transition={{type: 'spring', stiffness: 300, damping: 25}}/>
         </div>
      </div>
   );
}

const switchStyle = {
   active: {
      justifyContent: 'flex-end',
      backgroundColor: '#7bf2e6'
   },
   inactive: {
      justifyContent: 'flex-start',
      backgroundColor: '#80d6d4'
   }
}

const thumbStyle = {
   active: {
      backgroundColor: '#14bdb4'
   },
   inactive: {
      backgroundColor: '#49a8a5'
   }
}

export default ToggleSwitch;
