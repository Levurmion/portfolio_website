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
   useSpring
} from "framer-motion";

function MobileIconsRow({ children }) {
   const iconsRowRef = useRef(null);
   const [contentOverflow, setContentOverflow] = useState(false);

   const { scrollYProgress } = useScroll();
   const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -400]));

   useEffect(() => {
      if (iconsRowRef.current.scrollWidth > iconsRowRef.current.offsetWidth) {
         setContentOverflow(true);
      } else {
         setContentOverflow(false);
      }
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
