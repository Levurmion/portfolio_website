import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './Slider.module.scss'
import { Electrolize } from 'next/font/google';

function Slider({ range, interval, defaultVal, notifyChange, displayText }) {

   const thumbLeft = useRef(0)
   const thumbRef = useRef(null)
   const trackRef = useRef(null)
   const sliderBoxRef = useRef(null)

   const displayFontSize = useRef(null)
   const thumbWidth = useRef(null)
   const leftLim = useRef(0)
   const rightLim = useRef(0)
   const trackLength = useRef(0)
   const lowerBound = useRef(range[0])
   const valueInterval = useRef(range[1] - range[0])
   const valueBoundaries = useRef([])
   const thumbPosBoundaries = useRef([])
   const thumbNthInterval = useRef(null)
   const thumbPosIntervalSize = useRef(null)

   const [currentValue, setCurrentValue] = useState(defaultVal !== undefined ? defaultVal : range[0])

   // preserve function reference over component re-renders so it can be removed onMouseUp!
   const handleMouseMove = useCallback(event => {
      const { clientX } = event
      
      if (interval === undefined) {
         if (clientX < leftLim.current) {
            thumbLeft.current = 0
         } else if (clientX > rightLim.current) {
            thumbLeft.current = trackLength.current
         } else if ( leftLim.current < clientX && clientX < rightLim.current) {
            const newThumbLeft = clientX - leftLim.current
            thumbLeft.current = newThumbLeft
         }

         const slideProgress = calcSlideProgress()
         setCurrentValue(calcOutputValue(slideProgress))

      } else {
         
         // only calculate when clientX is within range of the track
         if (clientX >= leftLim.current - thumbWidth.current && clientX <= rightLim.current + thumbWidth.current) {

            const adjLeftPos = thumbPosBoundaries.current[thumbNthInterval.current - 1]
            const adjRightPos = thumbPosBoundaries.current[thumbNthInterval.current + 1]
            const relativeClientX = clientX - leftLim.current

            if (relativeClientX <= adjLeftPos) {
               thumbNthInterval.current = thumbNthInterval.current - 1
               thumbLeft.current = (thumbPosBoundaries.current[thumbNthInterval.current])
            } else if (relativeClientX >= adjRightPos) {
               thumbNthInterval.current = thumbNthInterval.current + 1
               thumbLeft.current = (thumbPosBoundaries.current[thumbNthInterval.current])
            }

            setCurrentValue(valueBoundaries.current[thumbNthInterval.current])
         }
         
      }

   }, [])

   function handleMouseDown(event) {
      window.addEventListener("mousemove", handleMouseMove)
   }

   function handleMouseUp(event) {
      window.removeEventListener("mousemove", handleMouseMove)
   }

   function handleWindowMouseUp(event) {
      handleMouseUp(event)
   }

   function calcSlideProgress() {
      return thumbLeft.current/trackLength.current
   }

   function calcOutputValue(slideProgress) {
      return parseFloat((lowerBound.current + slideProgress*valueInterval.current).toFixed(3))
   }

   function countDecimals(value) {
      if (Math.floor(value) !== value)
          return value.toString().split(".")[1].length || 0;
      return 0;
  }

   function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max)
   }

   function handleTrackClick(event) {
      const { clientX } = event
      const relativeClientX = clientX - leftLim.current

      // no interval provided
      if (interval === undefined && clientX >= leftLim.current - thumbWidth.current/2 && clientX <= rightLim.current + thumbWidth.current/2) {
         thumbLeft.current = clamp(relativeClientX, 0, trackLength.current)
         const slideProgress = calcSlideProgress()
         setCurrentValue(calcOutputValue(slideProgress))
      }
      // interval provided
      else if (interval !== undefined) {
         const lowerInterval = thumbPosBoundaries.current.findIndex(element => {
            return element <= relativeClientX && (relativeClientX - element) <= thumbPosIntervalSize.current
         })
         const higherInterval = thumbPosBoundaries.current.findIndex(element => {
            return element >= relativeClientX && (element - relativeClientX) <= thumbPosIntervalSize.current
         })
         const lowerIntervalDist = relativeClientX - thumbPosBoundaries.current[lowerInterval]
         const higherIntervalDist = thumbPosBoundaries.current[higherInterval] - relativeClientX

         // Arr.findIndex() returns -1 when element not found (i.e., relativeClientX out of range)
         if (higherIntervalDist < lowerIntervalDist || lowerInterval === -1) {
            thumbNthInterval.current = higherInterval
            thumbLeft.current = thumbPosBoundaries.current[higherInterval]
            setCurrentValue(valueBoundaries.current[thumbNthInterval.current])
         } else if (lowerInterval <= higherInterval || higherInterval === -1) {
            thumbNthInterval.current = lowerInterval
            thumbLeft.current = thumbPosBoundaries.current[lowerInterval]
            setCurrentValue(valueBoundaries.current[thumbNthInterval.current])
         }
      }

   }

   // handle initialization
   useLayoutEffect(() => {

      displayFontSize.current = sliderBoxRef.current.getBoundingClientRect().height * 0.55
      sliderBoxRef.current.style.fontSize = `${displayFontSize.current}px`

      const trackRect = trackRef.current.getBoundingClientRect()
      const trackLeft = trackRect.left
      const trackRight = trackRect.right

      thumbWidth.current = thumbRef.current.getBoundingClientRect().width

      leftLim.current = trackLeft + thumbWidth.current/2
      rightLim.current = trackRight - thumbWidth.current/2
      trackLength.current = rightLim.current - leftLim.current

      // if value intervals were specified, calculate the positions where the thumb can snap onto
      if (interval !== undefined) {
         if (Number.isInteger(valueInterval.current / interval)) {
            let valueBoundariesArr = []
            let currentValue = lowerBound.current
            let intervalPrecision = countDecimals(interval)

            while (currentValue <= range[1]) {
               valueBoundariesArr.push(parseFloat(currentValue.toFixed(intervalPrecision)))
               currentValue += interval
            }

            valueBoundaries.current = valueBoundariesArr
            const numBoundaries = valueBoundariesArr.length - 1
            const boundaryLength = trackLength.current/numBoundaries
            thumbPosIntervalSize.current = boundaryLength

            // set the positions along the track for thumb to snap to
            let snapPositions = [0]
            for (let nthBoundary = 1; nthBoundary <= numBoundaries; nthBoundary++) {
               snapPositions.push(nthBoundary * boundaryLength)
            }

            thumbPosBoundaries.current = snapPositions

            if (defaultVal !== undefined) {
               const rangeFraction = (defaultVal - lowerBound.current)/(valueInterval.current)
               const startPos = trackLength.current * rangeFraction
               const startNthInterval = thumbPosBoundaries.current.findIndex(element => element == startPos)
               if (startNthInterval === -1) {
                  throw new Error('The default value should evaluate to a valid thumb position along the track based on the given intervals.')
               } else {
                  thumbNthInterval.current = startNthInterval
               }
               thumbLeft.current = startPos
            } else {
               thumbNthInterval.current = 0
            }

         } else {
            throw new RangeError('<Slider /> range interval needs to evaluate to an integer quantity of equal fractional values.')
         }
      } 
      // if no intervals were provided, set the intial thumb positions if defaultVal is specified
      else {
         if (defaultVal !== undefined) {
            const rangeFraction = (defaultVal - lowerBound.current)/(valueInterval.current)
            const startPos = trackLength.current * rangeFraction
            thumbLeft.current = startPos
         }
      }

      window.addEventListener('mouseup', handleWindowMouseUp)

      return () => {
         window.removeEventListener('mouseup', handleWindowMouseUp)
      }
   }, [])

   useEffect(() => {
      notifyChange(currentValue)
   }, [currentValue])

   return ( 
      <div className={styles.sliderBox} ref={sliderBoxRef}>
         <div className={styles.sliderBody}>
            <div className={styles.sliderTrack} ref={trackRef} onClick={handleTrackClick}>
               <div className={styles.sliderThumb} style={{left: thumbLeft.current}} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} ref={thumbRef}></div>
            </div>
         </div>
         <div className={styles.valueDisplay} >
            <span>{(displayText !== undefined ? displayText : '') + currentValue}</span>
         </div>
      </div>
   );
}

export default Slider;