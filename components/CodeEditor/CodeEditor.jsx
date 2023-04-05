import styles from "./CodeEditor.module.scss";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function CodeEditorSVG({ id, text, animate }) {
  const textCharArray = useRef(text.split(""));
  const SVGEditor = useRef(null);
  const codeEditorWrapper = useRef(null);

  const [ charFontSize, setCharFontSize ] = useState(null)

  const codeEditorTextboxAnim = {
    initial: {
      display: "grid",
      fontSize: "inherit",
    },
    enter: {
      display: "grid",
      fontSize: "inherit",
      transition: {
        delayChildren: 1.5,
        staggerChildren: 0.1,
      },
    },
  };

  const textCharAnim = {
    initial: {
      display: "none",
      paddingBottom: '20%'
    },
    enter: {
      fontFamily: "'Roboto Mono', 'sans-serif'",
      fontWeight: 500,
      color: "#fffedd",
      alignItems: "center",
      paddingBottom: '20%',
      fontSize: "inherit",
      duration: 0.1,
      display: "flex",
    },
  };

  const cursorAnim = {
    blipOut: {
      display: "none",
    },
    blipIn: {
      display: "flex",
      transition: {
        duration: "0.5",
        repeat: "Infinity",
        repeatType: "loop",
      },
    },
  };

  function setCodeEditorDimensions() {
    const SVGRect = SVGEditor.current.getBoundingClientRect();
    const SVGWidth = SVGRect.width;
    const SVGHeight = SVGRect.height;

    const SVGnavbar = SVGHeight * 0.04;
    const SVGSideMargins = SVGWidth * 0.05;
    const gridFontSize = (SVGWidth / 30) * 1.4;
    setCharFontSize(String(gridFontSize) + "px")

    // set dimensions
    codeEditorWrapper.current.style.width =
      String(SVGWidth - SVGSideMargins) + "px";
    codeEditorWrapper.current.style.height =
      String(SVGHeight - SVGnavbar - SVGSideMargins) + "px";
    codeEditorWrapper.current.style.marginTop = String(SVGnavbar) + "px";
    codeEditorWrapper.current.style.fontSize = String(gridFontSize) + "px";
  }

  useEffect(() => {
    setCodeEditorDimensions();
    window.addEventListener("resize", setCodeEditorDimensions);
    return () => {
      window.removeEventListener("resize", setCodeEditorDimensions);
    };
  });

  return (
    <div className='SVGwrapper' id={id}>
      <div ref={codeEditorWrapper} className={styles.codeEditorWrapper}>
        <motion.div
          className={styles.codeEditorTextbox}
          initial={animate ? "initial" : false}
          animate='enter'
          exit={false}
          variants={codeEditorTextboxAnim}>
          <div className={styles.textChar}>&gt;</div>
          <div className={styles.textChar}>&gt;</div>
          <div className={styles.textChar}> </div>
          {textCharArray.current.map((char) => (
            <motion.div variants={textCharAnim} className={styles.textChar}>
              {char}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.01, repeatDelay: 0.75, repeatType: 'reverse' }}
            style={{ display: 'flex', alignItems: 'center' }}
            className={styles.textChar}>
            <div
              className="cursor"
              style={{
                height: '95%',
                width: '12.5%',
                backgroundColor: '#edecd6'
              }}
            ></div>
          </motion.div>
        </motion.div>
      </div>
      <svg
        viewBox='0 0 873 575'
        height='100%'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d_1_5)' ref={SVGEditor}>
          <rect x='6' width='863' height='565' rx='10' fill='#737373' />
          <path
            d='M6 10C6 4.47715 10.4772 0 16 0H859C864.523 0 869 4.47715 869 10V38H6V10Z'
            fill='#494949'
          />
          <circle cx='81' cy='19' r='10' fill='#82FF56' />
          <circle cx='53' cy='19' r='10' fill='#F2EB4E' />
          <circle cx='25' cy='19' r='10' fill='#FF5959' />
          <circle cx='25' cy='19' r='10' fill='#FF5959' />
          <circle cx='25' cy='19' r='10' fill='#FF5959' />
        </g>
        <defs>
          <filter
            id='filter0_d_1_5'
            x='0'
            y='0'
            width='873'
            height='575'
            filterUnits='userSpaceOnUse'
            color-interpolation-filters='sRGB'>
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset dx='-1' dy='5' />
            <feGaussianBlur stdDeviation='2.5' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
            />
            <feBlend
              mode='normal'
              in2='BackgroundImageFix'
              result='effect1_dropShadow_1_5'
            />
            <feBlend
              mode='normal'
              in='SourceGraphic'
              in2='effect1_dropShadow_1_5'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default CodeEditorSVG;
