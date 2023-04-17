import ScrollTick from "./ScrollTick/ScrollTick";
import styles from './ScrollTicks.module.scss';
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function ScrollTicks({ numPages, currentPage, style, notifyScrollNext, notifyScrollPrev, notifySkipToPage }) {
   const ticksRowRef = useRef(null);

   const ticksRowStyle = {
      display: "flex",
      position: "fixed",
      justifyContent: "center",
      alignItems: "center",
      height: "5vh",
      width: "50vw",
      top: "90vh",
      left: "25vw",
      gap: "1.5vw",
      ...style,
   };

   function renderScrollticks() {
      const pages = [...Array(numPages).keys()];
      return pages.map((page) => {
         if (parseInt(page) === currentPage) {
            return <ScrollTick key={page} selected={true} notifyClick={handleSkipToPage} forPage={page}/>;
         } else {
            return <ScrollTick key={page} selected={false} notifyClick={handleSkipToPage} forPage={page}/>;
         }
      });
   }

   function handleGoNext() {
      notifyScrollNext()
   }

   function handleGoPrev() {
      notifyScrollPrev()
   }

   function handleSkipToPage(page) {
      notifySkipToPage(page)
   }

   return (
      <div style={ticksRowStyle} ref={ticksRowRef}>
         <motion.div className={styles.navButtons} whileHover={{ x: "-0.2vw" }} whileTap={{ x: "-0.4vw" }} onTap={handleGoPrev}>
            <NavigateBeforeIcon fontSize='inherit' color='inherit' />
         </motion.div>
         {renderScrollticks()}
         <motion.div className={styles.navButtons} whileHover={{ x: "0.2vw" }} whileTap={{ x: "0.4vw" }} onTap={handleGoNext}>
            <NavigateNextIcon fontSize='inherit' color='inherit' />
         </motion.div>
      </div>
   );
}

export default ScrollTicks;
