import styles from './HeaderPic.module.scss'
import Image from 'next/image';

function HeaderPic({ imgSrc }) {
   return ( 
      <div className={styles.headerPicWrapper}>
         <Image fill className={styles.image} src={imgSrc}></Image>
      </div>
   );
}

export default HeaderPic;