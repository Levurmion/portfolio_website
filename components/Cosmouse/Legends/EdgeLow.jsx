import React, { useState, useEffect } from "react";

function EdgeLow(props) {

  return (
    <svg
      width={props.fontSize}
      height={props.fontSize}
      viewBox='0 0 400 400'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width='400' height='400' fill='none' />
      <g opacity='0.8' filter='url(#filter0_f_2_6)'>
        <path
          d='M90.25 318L310 98'
          stroke='#9C9C9C'
          stroke-width='17.5'
          stroke-dasharray='15 15'
        />
        <circle cx='310' cy='98' r='50' fill='#9C9C9C' />
        <circle cx='90' cy='318' r='50' fill='#9C9C9C' />
      </g>
      <path
        d='M90.125 310L309.875 90'
        stroke='#C7C7C7'
        stroke-width='17.5'
        stroke-dasharray='15 15'
      />
      <circle cx='310' cy='90' r='50' fill='#8E7FE3' />
      <circle cx='90' cy='310' r='50' fill='#8E7FE3' />
      <defs>
        <filter
          id='filter0_f_2_6'
          x='30'
          y='38'
          width='340'
          height='340'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'>
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='BackgroundImageFix'
            result='shape'
          />
          <feGaussianBlur
            stdDeviation='5'
            result='effect1_foregroundBlur_2_6'
          />
        </filter>
      </defs>
    </svg>
  );
}

export default EdgeLow
