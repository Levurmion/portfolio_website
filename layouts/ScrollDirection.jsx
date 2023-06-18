import styles from "./ScrollDirection.module.scss";
import { useLayoutEffect, useRef, useState, memo } from "react";
import { motion, useScroll, useAnimate, useMotionValueEvent, useVelocity, useMotionValue, useTransform, useSpring, animate } from "framer-motion";
import { sideScroll } from "@mui/icons-material";
import ScrollTicks from "../components/ScrollTicks/ScrollTicks";
import PanToolIcon from '@mui/icons-material/PanTool';

let dragPromptBoxAnim = {
   hover: {},
   unhover: {}
}

let dragPromptIconAnim = {
   hover: {
      transform: ['rotate(0deg) translateX(0vw)', 'rotate(3deg) translateX(0.8vw)', 'rotate(-3deg) translateX(-0.2vw)', 'rotate(0deg) translateX(0vw)'],
   },
   unhover: {
      transform: 'rotate(0deg)'
   }
}

let dragPromptTextAnim = {
   hover: {
      x: -5,
      opacity: 1
   },
   unhover: {
      x: [0,10,20],
      opacity: [1,0,0],
      transition: {
         type: 'tween',
         duration: 0.4
      }
   }
}

function ScrollDirection({ children, pageNames, pageColors }) {
   const [orientation, setOrientation] = useState(null);
   const [currentPage, setCurrentPage] = useState(0);

   // useRef protects the .current value of the reference variable from resets by stateful re-renders!!!
   // if eventListenerPageRef was not a useRef object, it will be reset with every React re-render!!!
   const sideScrollWrapperRef = useRef(null);
   const eventListenerPageRef = useRef(0);

   let lastClientX = 0;

   const initialPageThreshold = 1 / (pageNames.length + 1);
   const pageThresholdIntervals = 1 / (pageNames.length - 1);
   const scrollXMultiplier = 2.5;

   let pageNumbers = -1;
   const scrollProgressThresholds = pageNames.map((name) => {
      pageNumbers += 1;
      return pageNumbers * pageThresholdIntervals;
   });

   // variable to reference scroll setTimeout callback to
   let isScrolling = null;
   let clearIsScrolling = null;
   const waitTime = 100;

   // FramerMotion hooks
   const { scrollXProgress } = useScroll();
   const backgroundColor = useTransform(scrollXProgress, scrollProgressThresholds, pageColors);

   // determine page to snap to
   useMotionValueEvent(scrollXProgress, "change", (latest) => {
      const nextPageThreshold = initialPageThreshold + currentPage * pageThresholdIntervals;
      const prevPageThreshold = nextPageThreshold - pageThresholdIntervals;

      if (latest >= nextPageThreshold && latest < 1) {
         setCurrentPage(currentPage + 1);
         eventListenerPageRef.current += 1;
      } else if (latest < prevPageThreshold && latest < 1 && currentPage > 0) {
         setCurrentPage(currentPage - 1);
         eventListenerPageRef.current -= 1;
      }
   });

   // determine whether to use horizontal or vertical layout
   function determineOrientation() {
      if (window.matchMedia("(max-width: 1024px), (orientation: portrait), (pointer: coarse)").matches) {
         setOrientation("verticalScroll");
      } else {
         setOrientation("sideScroll");
      }
   }

   // handle moving to the next page when clicking on the '>' button
   function handleScrollNext() {
      setCurrentPage(currentPage < children.length ? currentPage + 1 : currentPage);
      eventListenerPageRef.current += eventListenerPageRef.current < children.length ? 1 : 0;
      window.scroll({
         left: (eventListenerPageRef.current * sideScrollWrapperRef.current.clientWidth) / pageNames.length,
         behavior: "smooth",
      });
   }

   // handle moving to previous page when clicking on '<' button
   function handleScrollPrev() {
      setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage);
      eventListenerPageRef.current -= eventListenerPageRef.current > 0 ? 1 : 0;
      window.scroll({
         left: (eventListenerPageRef.current * sideScrollWrapperRef.current.clientWidth) / pageNames.length,
         behavior: "smooth",
      });
   }

   // function to snap scroll to page
   function snapScrollToPage(pageToSnap) {
      window.scroll({
         left: (pageToSnap * sideScrollWrapperRef.current.clientWidth) / pageNames.length,
         behavior: "smooth",
      });
   }

   // handle end of scroll event to snap to the correct page
   function handleScrollX() {
      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
         snapScrollToPage(eventListenerPageRef.current);
      }, waitTime + 50);
   }

   // handle drag release (mouseup)
   function handleMouseUp(event) {
      window.clearInterval(clearIsScrolling);
      window.removeEventListener("mousemove", handleMouseMove);
      lastClientX = 0;
      snapScrollToPage(eventListenerPageRef.current);
   }

   // handle dragging while mousedown
   function handleMouseMove(event) {
      window.clearTimeout(isScrolling);
      let { clientX } = event;
      let deltaX = (clientX - lastClientX) * scrollXMultiplier;

      if (lastClientX === 0) {
         lastClientX = clientX;
      } else {
         window.scroll({
            left: window.scrollX + -deltaX,
            behavior: "instant",
         });
         lastClientX = clientX;
      }
   }

   function handleDrag() {
      clearIsScrolling = setInterval(() => {
         window.clearTimeout(isScrolling);
      }, waitTime);
      window.addEventListener("mousemove", handleMouseMove);
   }

   function handleSkipToPage(page) {
      setCurrentPage(page)
      eventListenerPageRef.current = page
      snapScrollToPage(page)
   }

   useLayoutEffect(() => {
      determineOrientation();

      if (orientation === "sideScroll") {
         window.scroll({
            left: (parseInt(sessionStorage.getItem("leftProjectsPage")) * sideScrollWrapperRef.current.clientWidth) / pageNames.length,
            behavior: "instant",
         });

         window.addEventListener("mousedown", handleDrag);
         window.addEventListener("mouseup", handleMouseUp);
         window.addEventListener("scroll", handleScrollX);

         scrollXProgress.set(0);
      }

      return () => {
         window.removeEventListener("resize", determineOrientation);
         window.removeEventListener("mousedown", handleDrag);
         window.removeEventListener("mouseup", handleMouseUp);
         window.removeEventListener("scroll", handleScrollX);
      };
   }, [orientation]);

   function renderPage() {
      if (orientation === null) {
         return <></>;
      } else if (orientation === "sideScroll") {
         return (
            <>
               <motion.div style={{ backgroundColor }} className={styles.sidescrollWrapper} ref={sideScrollWrapperRef}>
                  {children}
               </motion.div>
               <motion.div className={styles.dragPromptBox} initial={false} animate="unhover" whileHover="hover" exit={false} variants={dragPromptBoxAnim}>
                  <motion.span className={styles.dragPromptText} variants={dragPromptTextAnim}>drag to navigate!</motion.span>
                  <motion.div className={styles.dragPromptIcon} variants={dragPromptIconAnim}>
                     <PanToolIcon fontSize="inherit" color='inherit'/>
                  </motion.div>
               </motion.div>
               <div className={styles.scrollTicksRow}>
                  <ScrollTicks numPages={children.length} currentPage={currentPage} notifyScrollNext={handleScrollNext} notifyScrollPrev={handleScrollPrev} notifySkipToPage={handleSkipToPage}/>
               </div>
            </>
         );
      } else if (orientation === "verticalScroll") {
         return (
            <div className='verticalScrollbox' style={{ display: "flex", flexDirection: "column", width: "90vw", paddingInline: "5vw", alignItems: "center" }}>
               {children}
            </div>
         );
      }
   }

   return renderPage();
}

export default memo(ScrollDirection);
