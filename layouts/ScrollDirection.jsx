import styles from './ScrollDirection.module.scss';
import { useEffect, useRef, useState } from 'react';

function ScrollDirection({ children }) {

  const [orientation, setOrientation] = useState(null)
  const sidescrollWrapperRef = useRef(null)

  function determineOrientation () {
    if (window.matchMedia('(max-width: 1350px),(orientation: portrait)').matches) {
      setOrientation('portrait')
    } else {
      setOrientation('landscape')
      if (sidescrollWrapperRef.current != null) {
        sidescrollWrapperRef.current.childNodes.forEach(child => {
          child.style.width = '100vw'
        })
      }
    }
  }

  useEffect(() => {
    determineOrientation()
    window.addEventListener('resize', determineOrientation)
    return () => {
      window.removeEventListener('resize',determineOrientation)
    }
  })

  return ( 
    <>
      {orientation === 'landscape' ? (
        <div className={styles.sidescrollWrapper} ref={sidescrollWrapperRef}>
          {children}
        </div>
      ):(
        children
      )}
    </>
   );
}

export default ScrollDirection;