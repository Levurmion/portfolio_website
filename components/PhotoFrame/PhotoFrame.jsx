import { useLayoutEffect, useRef, useState } from "react";
import styles from "./PhotoFrame.module.scss";

// if notifyClick is not defined, the component is assumed to be a dumb component
function PhotoFrame({ imageURL, borderRadius, selected, notifyClick }) {

   const photoFrameRef = useRef(null)
   const [isSelected, setIsSelected] = useState(selected)

   useLayoutEffect(() => {

      photoFrameRef.current.style.backgroundImage = `url("${imageURL}")`

      if (!isSelected) {
         photoFrameRef.current.style.filter = 'grayscale(60%)'
      } else {
         photoFrameRef.current.style.filter = 'grayscale(0%)'
      }

   }, [isSelected, selected, imageURL])


   function handleOnClick() {
      // only allow control of isSelected state if it is a smart component
      if (typeof notifyClick === 'function') {
         setIsSelected(!isSelected)
         notifyClick()
      }
   }

   return (
      <div
         className={typeof notifyClick === 'function' ? styles.frame : styles.dumbFrame}
         style={{ 
            borderRadius, 
            backgroundImage: `url("${imageURL}")` 
         }}
         ref={photoFrameRef}
         onClick={handleOnClick}
         >

      </div>
   );
}

export default PhotoFrame;
