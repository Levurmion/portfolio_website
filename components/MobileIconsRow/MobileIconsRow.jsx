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
import {
   motion,
   useMotionValueEvent,
   useScroll,
   useTransform,
} from "framer-motion";

function MobileIconsRow({ children }) {
   const iconsRowRef = useRef(null);
   const [contentOverflow, setContentOverflow] = useState(false);

   const { scrollYProgress } = useScroll();
   const x = useTransform(scrollYProgress, [0, 1], [0, -400]);

   useEffect(() => {
      if (iconsRowRef.current.scrollWidth > screen.width) {
         setContentOverflow(true);
      } else {
         setContentOverflow(false);
      }
      console.log(iconsRowRef.current.scrollWidth);
      console.log(screen.width);
      console.log(contentOverflow);
   }, [contentOverflow]);

   return !contentOverflow ? (
      <div className={styles.iconsRow} ref={iconsRowRef}>
         {children}
      </div>
   ) : (
      <div className={styles.iconsWindow}>
         <motion.div
            drag='x'
            dragSnapToOrigin
            style={{ x }}
            className={styles.iconsRow}
            ref={iconsRowRef}>
            {children}
         </motion.div>
      </div>
   );
}

export default MobileIconsRow;
