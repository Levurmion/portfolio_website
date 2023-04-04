
function CodeEditorSVG({ id }) {

  const calc_responsive_size = (height) => {

    if (height.match(/vw$/)) {
      const relWidth = parseInt(height.replace('vw',''))
      const viewportWidth = window.innerWidth * relWidth/100
      console.log(viewportWidth)
      return String(viewportWidth) + "px"
    } else if (height.match(/vh$/)) {
      const relHeight = parseInt(height.replace('vh',''))
      const viewporthHeight = window.innerHeight * relHeight/100
      return String(viewporthHeight) + "px"
    } else if (height.match(/px$/)) {
      return height
    } else {
      throw new Error('CodeEditorSVG height prop can only be vw, vh, or px')
    }

  }

  return (
    <div className="SVGwrapper" id={id}>
    <svg
      viewBox='0 0 873 575'
      height='100%'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d_1_5)'>
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
