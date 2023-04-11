import styles from "./ScrollDirection.module.scss";
import { useEffect, useRef, useState } from "react";
import {
   motion,
   useScroll,
   useAnimate,
   useMotionValueEvent,
   useVelocity,
   useMotionValue,
   useTransform,
   useSpring,
   animate,
} from "framer-motion";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { sideScroll } from "@mui/icons-material";

const scrollTicksBoxAnim = {
   initial: {},
   hovered: {},
};

const scrollTicksLabelAnim = {
   initial: {
      y: "2.5vh",
      opacity: 0,
      transition: {
         type: "spring",
         stiffness: 300,
         damping: 15,
      },
   },
   hovered: {
      y: ["2.5vh", "3vh"],
      opacity: [0, 1],
      transition: {
         type: "spring",
         stiffness: 300,
         damping: 20,
      },
   },
};

function ScrollDirection({ children, pageNames, pageColors }) {

   const [orientation, setOrientation] = useState('sideScroll');

   const sideScrollWrapperRef = useRef(null);

   let currentPage = 0;
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

   const [scrollTickRef, animateScrollTickRef] = useAnimate();
   const backgroundColor = useTransform(scrollXProgress, scrollProgressThresholds, pageColors);

   // determine page to snap to
   useMotionValueEvent(scrollXProgress, "change", (latest) => {
      const nextPageThreshold =
         initialPageThreshold + currentPage * pageThresholdIntervals;
      const prevPageThreshold = nextPageThreshold - pageThresholdIntervals;

      if (latest >= nextPageThreshold && latest < 1) {
         currentPage += 1;
         if (sideScrollWrapperRef.current !== null) {
            animateScrollTicks(pageNames[currentPage - 1]);
         }
      } else if (latest < prevPageThreshold && latest < 1 && currentPage > 0) {
         currentPage -= 1;
         if (sideScrollWrapperRef.current !== null) {
            animateScrollTicks(pageNames[currentPage + 1]);
         }
      } else {
      }
   });

   function animateScrollTicks(pageToReset) {
      const thisPage = pageNames[currentPage];

      const thisPageTargetStyle = {
         borderRadius: "5%",
         transform: "rotate(135deg) scale(1.5)",
      };

      const defaultStyle = {
         borderRadius: "50%",
         transform: "rotate(0deg) scale(1)",
      };

      animateScrollTickRef(`#${thisPage} > .tick`, thisPageTargetStyle, {
         type: "spring",
         stiffness: 300,
         damping: 20,
      });
      animateScrollTickRef(`#${pageToReset} > .tick`, defaultStyle, {
         type: "spring",
         stiffness: 300,
         damping: 20,
      });
   }

   // determine whether to use horizontal or vertical layout
   function determineOrientation() {
      if (window.matchMedia('(max-width: 1024px), (orientation: portrait), (pointer: coarse)').matches){
         console.log('vertical')
         setOrientation("verticalScroll");
      } else {
         console.log('horizontal')
         setOrientation("sideScroll");
      }
   }

   // draw scroll ticks based on the number of provided and detected pages in the application
   function drawScrollTicks() {
      const numPages =
         sideScrollWrapperRef.current !== null
            ? sideScrollWrapperRef.current.childNodes.length
            : 0;

      let pageCounter = -1;

      if (pageNames.length != numPages && numPages > 0) {
         throw new Error(
            "pageNames array does not have the same number of labels as the number of existing pages."
         );
      } else {
         return pageNames.map((name) => {
            pageCounter += 1;
            return (
               <motion.div
                  key={name}
                  className={styles.scrollTicksBox}
                  initial='initial'
                  whileHover='hovered'
                  id={name}
                  variants={scrollTicksBoxAnim}>
                  <motion.div
                     className={styles.scrollTicksLabel}
                     variants={scrollTicksLabelAnim}>
                     {/* {name} */}
                  </motion.div>
                  <motion.div
                     className={styles.scrollTicks + " tick"}
                     onClick={handleSkipToPage}
                     pagenumber={pageCounter}
                     animate={{
                        borderRadius: "50%",
                        transform: "rotate(0deg) scale(1)",
                     }}
                     whileHover={{ cursor: "pointer" }}></motion.div>
               </motion.div>
            );
         });
      }
   }

   // handle moving to the next page when clicking on the '>' button
   function handleScrollNext() {
      currentPage =
         currentPage < pageNames.length - 1 ? currentPage + 1 : currentPage;
      window.scroll({
         left:
            (currentPage * sideScrollWrapperRef.current.clientWidth) /
            pageNames.length,
         behavior: "smooth",
      });
   }

   // handle moving to previous page when clicking on '<' button
   function handleScrollPrev() {
      currentPage = currentPage > 0 ? currentPage - 1 : currentPage;
      window.scroll({
         left:
            (currentPage * sideScrollWrapperRef.current.clientWidth) /
            pageNames.length,
         behavior: "smooth",
      });
   }

   // handle skipping to a page when clicking on one of the scroll ticks
   function handleSkipToPage(event) {
      currentPage = parseInt(event.target.getAttribute("pagenumber"));
      console.log(currentPage);
      snapScrollToPage();
   }

   // function to snap scroll to page
   function snapScrollToPage() {
      window.scroll({
         left:
            (currentPage * sideScrollWrapperRef.current.clientWidth) /
            pageNames.length,
         behavior: "smooth",
      });
   }

   // handle end of scroll event to snap to the correct page
   function handleScrollX() {
      window.clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
         snapScrollToPage();
      }, waitTime + 10);
   }

   // handle drag release (mouseup)
   function handleMouseUp(event) {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(clearIsScrolling);

      lastClientX = 0;
      snapScrollToPage();
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

   useEffect(() => {
      determineOrientation();
      window.addEventListener("resize", determineOrientation);
      console.log('mounting')


      if (orientation === 'sideScroll') {
         window.addEventListener("mousedown", handleDrag);
         window.addEventListener("mouseup", handleMouseUp);
         window.addEventListener("scroll", handleScrollX);

         scrollXProgress.set(0)

         const firstTick = pageNames[0];
         animateScrollTickRef(
            `#${firstTick} > .tick`,
            {
               borderRadius: "5%",
               transform: "rotate(135deg) scale(1.5)",
            },
            {
               type: "spring",
               stiffness: 300,
               damping: 20,
            }
         );
      }
      
      return () => {
         window.removeEventListener("resize", determineOrientation);
         window.removeEventListener("mousedown", handleDrag);
         window.removeEventListener("mouseup", handleMouseUp);
         window.removeEventListener("scroll", handleScrollX);
      };
   },[orientation]);

   return (
      <>
         {orientation === "sideScroll" ? (
            <>
               <motion.div
                  style={{ backgroundColor }}
                  className={styles.sidescrollWrapper}
                  ref={sideScrollWrapperRef}>
                  {children}
               </motion.div>
               <div className={styles.scrollTicksRow} ref={scrollTickRef}>
                  <motion.div
                     className={styles.navButtons}
                     whileHover={{ x: "-0.2vw" }}
                     whileTap={{ x: "-0.4vw" }}
                     // onClick={handleScrollPrev}
                     onTap={handleScrollPrev}>
                     <NavigateBeforeIcon fontSize='inherit' color='inherit' />
                  </motion.div>
                  {drawScrollTicks()}
                  <motion.div
                     className={styles.navButtons}
                     whileHover={{ x: "0.2vw" }}
                     whileTap={{ x: "0.4vw" }}
                     // onClick={handleScrollNext}
                     onTap={handleScrollNext}>
                     <NavigateNextIcon fontSize='inherit' color='inherit' />
                  </motion.div>
               </div>
            </>
         ) : (
            <div className='verticalScrollbox' style={{display: 'flex', flexDirection: 'column', width: '90vw', paddingInline: '5vw', alignItems: 'center'}}>
               {children}
            </div>
         )}
      </>
   );
}

export default ScrollDirection;
