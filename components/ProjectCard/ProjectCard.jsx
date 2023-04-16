import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCard.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import {
   AnimatePresence,
   motion,
   useMotionValue,
   useMotionValueEvent,
   useSpring,
   useTransform,
} from "framer-motion";
import Link from "next/link";

const cardAnim = {
   initial: {
      opacity: 0
   },
   default: {
      scale: 1,
      opacity: 1,
      transition: {
         type: "spring",
         stiffness: 50,
         damping: 12,
      },
   },
   hover: {
      scale: 1.1,
      cursor: "pointer",
      transition: {
         type: "spring",
         stiffness: 100,
         damping: 15,
      },
   },
};

function ProjectCard({ header, description, imageSrc, notifyClick, linkURL }) {

   const cardRef = useRef(null);
   const cardShadowRef = useRef(null);
   const [cardClicked, setCardClicked] = useState(false);
   const [isMobile, setIsMobile] = useState(null);

   const router = useRouter();

   // hover animation setup
   const cursorCenterOffsetX = useMotionValue(0);
   const cursorCenterOffsetY = useMotionValue(0);
   const scale = useMotionValue(1);
   const cursorOffsetXSpring = useSpring(cursorCenterOffsetX, {
      stiffness: 100,
      damping: 15,
   });
   const cursorOffsetYSpring = useSpring(cursorCenterOffsetY, {
      stiffness: 100,
      damping: 15,
   });
   const x = useTransform(cursorOffsetXSpring, [-0.5, 0.5], [10, -10]);
   const y = useTransform(cursorOffsetYSpring, [-0.5, 0.5], [10, -15]);
   const opacity = useTransform(scale, [1, 1.1], [0, 1]);

   useMotionValueEvent(opacity, "change", (latest) => {
      if (cardShadowRef.current !== null) {
         cardShadowRef.current.style.opacity = latest;
      }
   });

   function handleMousemoveOnCard(event) {
      const cardRect = cardRef.current.getBoundingClientRect();
      const cardCenterX = (cardRect.right + cardRect.left) / 2;
      const cardCenterY = (cardRect.bottom + cardRect.top) / 2;

      const centerOffsetX = (event.clientX - cardCenterX) / cardRect.width;
      const centerOffsetY = (event.clientY - cardCenterY) / cardRect.height;

      cursorCenterOffsetX.set(centerOffsetX);
      cursorCenterOffsetY.set(centerOffsetY);
   }

   function handleHoverStart(event) {
      cardRef.current.addEventListener("mousemove", handleMousemoveOnCard);
   }

   function handleHoverEnd(event) {
      cursorCenterOffsetX.set(0);
      cursorCenterOffsetY.set(0);
      cardRef.current.removeEventListener("mousemove", handleMousemoveOnCard);
   }

   function handleClick(event) {
      cursorCenterOffsetX.set(0);
      cursorCenterOffsetY.set(0);
      cardRef.current.removeEventListener("mousemove", handleMousemoveOnCard)
      event.preventDefault()
      setCardClicked(true)
      notifyClick()
      sessionStorage.setItem("leftProjectsPage", "1")
      setTimeout(() => {
         router.push(linkURL)
      }, isMobile ? 1 : 750)
   }

   useEffect(() => {

      setIsMobile(window.matchMedia('(max-width: 1024px)').matches)

   },[isMobile]);

   return (
      <Link
         href='/'
         onClick={handleClick}
         key={"projectCard"}
         style={{ textDecoration: "none", color: "none" }}>
         <motion.div
            className={styles.cardWrapper}
            key={"small"}
            initial={cardAnim.initial}
            animate={cardAnim.default}
            exit={isMobile ? {} : { opacity: 0 }}
            whileHover={cardAnim.hover}
            whileTap={{ scale: 1.05 }}
            onHoverStart={isMobile ? () => {} : () => {handleHoverStart()}}
            onHoverEnd={isMobile ? () => {} : () => {handleHoverEnd()}}
            onTap={handleClick}
            style={{ x, y, scale }}
            ref={cardRef}>
            <div className={styles.cardShadow} ref={cardShadowRef}></div>
            <div className={styles.imageWrapper}>
               <Image
                  alt='image'
                  className={styles.image}
                  fill
                  src={imageSrc}></Image>
            </div>
            <div className={styles.textbox}>
               <header className={styles.header}>{header}</header>
               <p className={styles.description}>{description}</p>
            </div>
         </motion.div>
      </Link>
   );
}

export default ProjectCard;
