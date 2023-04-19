import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const scrollTickAnim = {
   default: {
      display: 'block',
      height: '0.4vw',
      width: '0.4vw',
      borderRadius: '50%',
      transform: 'rotate(0deg) scale(1)',
      scale: 1,
      backgroundColor: '#167d7f'
   },
   selected: {
      display: 'block',
      height: '0.4vw',
      width: '0.4vw',
      borderRadius: '10%',
      transform: 'rotate(135deg) scale(1.5)',
      backgroundColor: '#167d7f'
   }
}

function ScrollTick({ selected, style }) {

   const [isSelected, setIsSelected] = useState(selected)

   const scrollTickBoxStyle = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: '3vw',
      width: '10%',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
   }

   useEffect(() => {
      setIsSelected(selected)
   }, [selected])

   return (
      <motion.div style={scrollTickBoxStyle}>
         <motion.div 
            initial={false}
            animate={isSelected ? scrollTickAnim.selected : scrollTickAnim.default}
            transition={{type: 'spring', stiffness: 300, damping: 20}}
            >
         </motion.div>
      </motion.div>
   );
}

export default ScrollTick;
