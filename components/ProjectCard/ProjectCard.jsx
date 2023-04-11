import { useEffect, useRef, useState } from "react";
import styles from "./ProjectCard.module.scss";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const cardAnim = {
   default: {
      scale: 1,
      transition: {
         type: "spring",
         stiffness: 100,
         damping: 12,
      },
   },
   hover: {
      scale: 1.1,
      cursor: "pointer",
      transition: {
         type: "spring",
         stiffness: 200,
         damping: 18,
      },
   },
};

function ProjectCard({ header, description, imageSrc }) {

   const cardRef = useRef(null);

   const cursorCenterOffsetX = useMotionValue(0);
   const cursorCenterOffsetY = useMotionValue(0);
   const cursorOffsetXSpring = useSpring(cursorCenterOffsetX, {stiffness: 100, damping: 15})
   const cursorOffsetYSpring = useSpring(cursorCenterOffsetY, {stiffness: 100, damping: 15})
   const x = useTransform(cursorOffsetXSpring, [-0.5, 0.5], [10, -10]);
   const y = useTransform(cursorOffsetYSpring, [-0.5, 0.5], [10, -15]);

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
      cursorCenterOffsetX.set(0)
      cursorCenterOffsetY.set(0)
      cardRef.current.removeEventListener("mousemove", handleMousemoveOnCard);
   }

   return (
      <motion.div
         className={styles.cardWrapper}
         initial={false}
         animate={cardAnim.default}
         whileHover={cardAnim.hover}
         whileTap={{scale: 1.05}}
         onHoverStart={handleHoverStart}
         onHoverEnd={handleHoverEnd}
         style={{x, y}}
         ref={cardRef}>
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
   );
}

export default ProjectCard;
