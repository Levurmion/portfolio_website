import { useLayoutEffect, useRef, useState } from "react";
import {motion} from 'framer-motion';
import styles from "./PhotoFrame.module.scss";
import Image from "next/image";

// if notifyClick is not defined, the component is assumed to be a dumb component
function PhotoFrame({ imageURL, borderRadius, selected, notifyClick, setter }) {
   const photoFrameRef = useRef(null);
   const imageBorderRadius = String(parseInt(borderRadius.replace("px", "")) / 1.5) + "px";

   useLayoutEffect(() => {
      if (!selected) {
         photoFrameRef.current.style.filter = "grayscale(80%)";
      } else if (selected && typeof notifyClick === "function") {
         photoFrameRef.current.style.filter = "grayscale(0%)";
      }
   }, [selected]);

   function handleOnClick() {
      if (typeof notifyClick === "function") {
         notifyClick(imageURL, setter, selected);
      }
   }

   return (
      <div
         className={typeof notifyClick === "function" ? styles.frame : styles.dumbFrame}
         style={{ borderRadius: imageBorderRadius }}
         ref={photoFrameRef}
         onClick={handleOnClick}>
         <Image fill src={imageURL} style={{ borderRadius: imageBorderRadius, objectFit: "contain" }} />
         {
            typeof notifyClick === "function" ? (
               <motion.div 
                  className={styles.selectionHighlighter}
                  initial={false}
                  animate={selected ? {opacity: 1} : {opacity: 0}}
                  transition={{type: 'tween'}}>
               </motion.div>
            ) : (
               <></>
            )
         }
      </div>
   );
}

export default PhotoFrame;