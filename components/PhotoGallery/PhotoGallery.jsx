import { useLayoutEffect, useRef } from "react";
import PhotoFrame from "../PhotoFrame/PhotoFrame";
import styles from "./PhotoGallery.module.scss";

function PhotoGallery({ imageURLs }) {
   const galleryRef = useRef(null);
   const selectedPhotoRef = useRef(null);
   const photoOptionsRef = useRef(null);

   useLayoutEffect(() => {
      const selectedPhotoRect = selectedPhotoRef.current.getBoundingClientRect();
      const selectedPhotoHeight = selectedPhotoRect.width;

      selectedPhotoRef.current.style.height = String(selectedPhotoHeight) + "px";
      photoOptionsRef.current.style.height = String(selectedPhotoHeight / 4) + "px";
   });

   return (
      <div className={styles.gallery} ref={galleryRef}>
         <div className={styles.selectedPhoto} ref={selectedPhotoRef}>
            <div className={styles.selectedPhotoWrapper}>
               <PhotoFrame imageURL={"/images/cosmouse.png"} borderRadius={"10px"} selected={true} />
            </div>
         </div>
         <div className={styles.photoOptions} ref={photoOptionsRef}>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={"/images/cosmouse.png"} borderRadius={"10px"} selected={true} />
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={"/images/cosmouse.png"} borderRadius={"10px"} selected={true} />
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={"/images/cosmouse.png"} borderRadius={"10px"} selected={true} />
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={"/images/cosmouse.png"} borderRadius={"10px"} selected={true} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default PhotoGallery;
