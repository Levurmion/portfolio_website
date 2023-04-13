"client side";
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
   useSpring,
   useTime,
   useMotionValue,
} from "framer-motion";

function MobileIconsRow({ children }) {
   const iconsRowRef = useRef(null);
   const [targetX, setTargetX] = useState({});
   const [mobileMode, setMobileMode] = useState(true);

   // after mounting, check device dimensions
   useEffect(() => {
      setMobileMode(
         iconsRowRef.current.getBoundingClientRect().width > screen.width &&
            window.matchMedia("(orientation: portrait), (max-width: 414px)")
               .matches
      );
      setTargetX(
         iconsRowRef.current.getBoundingClientRect().width / 2 +
            0.025 * screen.width
      );
   }, [mobileMode, targetX]);
   

   return !mobileMode ? (
      <div className={styles.iconsRow} ref={iconsRowRef}>
         {children}
      </div>
   ) : (
      <div className={styles.iconsWindow}>
         <motion.div
            initial={{ x: 0 }}
            animate={{ x: targetX }}
            transition={{ ease: "linear", duration: 10, repeat: Infinity }}
            className={styles.iconsRow}
            ref={iconsRowRef}>
            {children}
            {children}
         </motion.div>
      </div>
   );
}

export default memo(MobileIconsRow);
