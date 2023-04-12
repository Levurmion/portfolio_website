import { useEffect, useRef, useState } from "react";

function FramerMotionIcon({ color }) {

   const iconBoxRef = useRef(null)
   const framerLogoRef = useRef(null)
   const [textFontSize, setTextFontSize] = useState('10px')

   const iconBox = {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
   }

   const framerLogo = {
      transform: 'translateY(3%)'
   }

   const motionText = {
      color: color,
      transform: 'translateY(20%)',
      fontFamily: '"GET Walsheim", "Helvetica Neue", "Helvetica"',
      fontFeatureSettings: '"Liga", "clig"',
      fontSize: textFontSize,
      fontWeight: 600
   }

   useEffect(() => {
      const iconBoxHeight = iconBoxRef.current.getBoundingClientRect().height
      const framerLogoHeight = framerLogoRef.current.getBoundingClientRect().height
      const remainingHeight = iconBoxHeight - framerLogoHeight
      setTextFontSize(String(remainingHeight) + 'px')
   },[textFontSize])

   return (
      <div style={iconBox} ref={iconBoxRef}>
         <svg
            style={framerLogo}
            ref={framerLogoRef}
            xmlns='http:www.w3.org/2000/svg'
            viewBox='0 0 14 21'
            height='75%'
            role='presentation'>
            <path d='M0 0h14v7H7zm0 7h7l7 7H7v7l-7-7z' fill={color}></path>
         </svg>
         <span style={motionText} class="Navigation_logoWordmark__17rYp">Motion</span>
      </div>
   );
}

export default FramerMotionIcon;
