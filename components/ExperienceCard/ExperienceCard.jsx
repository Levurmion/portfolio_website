import styles from './ExperienceCard.module.scss'
import HeaderPic from './HeaderPic/HeaderPic';

function ExperienceCard({ skillsIcon, header, description, imgSrc }) {

   return ( 
      <div className={styles.experienceCard}>
         <div className={styles.headerPic}>
            <HeaderPic imgSrc={imgSrc}/>
         </div>
         <div className={styles.description}>
            <div className={styles.skillsIcon}>
               {skillsIcon}
            </div>
            <div className={styles.descriptionHeader}>
               {header}
            </div>
            <div className={styles.descriptionText}>
               {description}
            </div>
         </div>
      </div>
   );
}

export default ExperienceCard;