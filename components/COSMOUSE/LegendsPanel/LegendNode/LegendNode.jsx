import { useLayoutEffect, useRef } from 'react';
import styles from './LegendNode.module.scss'

function LegendNode({ nodeColor, labelText }) {

   const labelRef = useRef(null)

   useLayoutEffect(() => {
      const labelHeight = labelRef.current.getBoundingClientRect().height
      const labelFontSize = labelHeight * 0.8
      labelRef.current.style.fontSize = `${labelFontSize}px`
   }, [])

   return ( 
      <div className={styles.legendNodeWrapper}>
         <div className={styles.legendNode} style={{ backgroundColor: nodeColor }}></div>
         <div className={styles.legendLabel} ref={labelRef}>
            <div>{labelText}</div>
         </div>
      </div>
   );
}

export default LegendNode;