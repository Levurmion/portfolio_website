import styles from "./ProjectCard.module.scss";

function ProjectCard() {
   return (
      <div className={styles.cardWrapper}>
         <svg
            height='100%'
            viewBox='0 0 528 651'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g filter='url(#filter0_d_79_9)'>
               <rect
                  x='24'
                  y='11'
                  width='488'
                  height='611'
                  rx='12'
                  fill='white'
               />
            </g>
            <defs>
               <filter
                  id='filter0_d_79_9'
                  x='0'
                  y='0'
                  width='528'
                  height='651'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'>
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                     in='SourceAlpha'
                     type='matrix'
                     values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                     result='hardAlpha'
                  />
                  <feOffset dx='-4' dy='9' />
                  <feGaussianBlur stdDeviation='10' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                     type='matrix'
                     values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                  />
                  <feBlend
                     mode='normal'
                     in2='BackgroundImageFix'
                     result='effect1_dropShadow_79_9'
                  />
                  <feBlend
                     mode='normal'
                     in='SourceGraphic'
                     in2='effect1_dropShadow_79_9'
                     result='shape'
                  />
               </filter>
            </defs>
         </svg>
      </div>
   );
}

export default ProjectCard;
