import styles from "./MobileIconsRow.module.scss";
import HTMLIcon from "../../icons/HTMLIcon";
import CSSIcon from "../../icons/CSSIcon";
import JavascriptIcon from "../../icons/JavascriptIcon";
import NextIcon from "../../icons/NextIcon";
import ReactIcon from "../../icons/ReactIcon";
import FramerMotionIcon from "../../icons/FramerMotionIcon";
import PythonIcon from "../../icons/PythonIcon";
import DjangoIcon from "../../icons/DjangoIcon";
import MySQLIcon from "../../icons/MySQLIcon";
import { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";

function MobileIconsRow({ children }) {
   const iconsRowRef = useRef(null);
   const targetX = useRef(null);
   const [scrollingRow, setScrollingRow] = useState(null);

   // after mounting, check device dimensions and determine if we should inifite scroll the row
   useEffect(() => {

      const numChildren = children.length
      const viewportHeight = screen.height
      const viewportWidth = screen.width
      const mobileAndLaptopRowHeight = 0.06 //vh
      const landscapeTabletRowHeight = 0.08 //vh
      const iconsGap = 0.05 //vw

      // landscape tablets
      if (window.matchMedia('(415px <= width <= 1024px) and (pointer: coarse) and (orientation: landscape)').matches) {
         const rowHeight = landscapeTabletRowHeight * viewportHeight // equal to the width of each icon
         const totalGapsWidth = (iconsGap * (numChildren - 1)) * viewportWidth
         const totalIconsWidth = numChildren * rowHeight
         const totalRowWidth = totalGapsWidth + totalIconsWidth
         targetX.current = totalRowWidth + 1.25*(iconsGap * viewportWidth)
         setScrollingRow(totalRowWidth > viewportWidth)
      } else { // everything else (portrait mobile and tablet, laptops)
         const rowHeight = mobileAndLaptopRowHeight * viewportHeight // equal to the width of each icon
         const totalGapsWidth = (iconsGap * (numChildren - 1)) * viewportWidth
         const totalIconsWidth = numChildren * rowHeight
         const totalRowWidth = totalGapsWidth + totalIconsWidth
         targetX.current = totalRowWidth + 1.25*(iconsGap * viewportWidth)
         setScrollingRow(totalRowWidth > viewportWidth)
      }

   }, []);

   function renderIconsRow() {
      if (scrollingRow === null) {
         return <></>;
      } else if (scrollingRow === false) {
         return (
            <div className={styles.iconsRow} ref={iconsRowRef}>
               {children}
            </div>
         );
      } else if (scrollingRow === true) {
         return (
            <div className={styles.iconsWindow}>
               <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: targetX.current }}
                  transition={{ ease: "linear", duration: 10, repeat: Infinity }}
                  className={styles.iconsRow}
                  ref={iconsRowRef}>
                  {children}
                  {children}
               </motion.div>
            </div>
         );
      }
   }

   return renderIconsRow()
}

export default MobileIconsRow;
