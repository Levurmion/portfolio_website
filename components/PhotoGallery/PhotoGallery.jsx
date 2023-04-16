import { useLayoutEffect, useRef, useState } from "react";
import PhotoFrame from "../PhotoFrame/PhotoFrame";
import styles from "./PhotoGallery.module.scss";

function PhotoGallery({ imageURLs }) {

   const galleryRef = useRef(null);
   const selectedPhotoRef = useRef(null);
   const photoOptionsRef = useRef(null);

   const [photoA, setPhotoA] = useState(true);
   const [photoB, setPhotoB] = useState(false);
   const [photoC, setPhotoC] = useState(false);
   const [photoD, setPhotoD] = useState(false);
   const [displayedPhoto, setDisplayedPhoto] = useState(imageURLs[0])

   // keep track of the last photo state setter function
   const lastSetter = useRef(setPhotoA)

   useLayoutEffect(() => {
      // responsively adjust height to maintain gallery aspect ratio
      const selectedPhotoRect = selectedPhotoRef.current.getBoundingClientRect();
      const selectedPhotoHeight = selectedPhotoRect.width;

      selectedPhotoRef.current.style.height = String(selectedPhotoHeight) + "px";
      photoOptionsRef.current.style.height = String(selectedPhotoHeight / 4) + "px";
   }, []);

   function handlePhotoClick(urlToDisplay, setter, currentState) {

      // set the last selected photo to false and reassign lastSetter to the current setter
      lastSetter.current(false);
      lastSetter.current = setter;

      // change displayed image and set the selected image to true
      setDisplayedPhoto(urlToDisplay);
      setter(true);
   }

   return (
      <div className={styles.gallery} ref={galleryRef}>
         <div className={styles.selectedPhoto} ref={selectedPhotoRef}>
            <div className={styles.selectedPhotoWrapper}>
               <PhotoFrame imageURL={displayedPhoto} borderRadius={"10px"} selected={true} />
            </div>
         </div>
         <div className={styles.photoOptions} ref={photoOptionsRef}>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={imageURLs[0]} borderRadius={"8px"} selected={photoA} notifyClick={handlePhotoClick} setter={setPhotoA}/>
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={imageURLs[1]} borderRadius={"8px"} selected={photoB} notifyClick={handlePhotoClick} setter={setPhotoB}/>
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={imageURLs[2]} borderRadius={"8px"} selected={photoC} notifyClick={handlePhotoClick} setter={setPhotoC}/>
               </div>
            </div>
            <div className={styles.photos}>
               <div className={styles.photoWrapper}>
                  <PhotoFrame imageURL={imageURLs[3]} borderRadius={"8px"} selected={photoD} notifyClick={handlePhotoClick} setter={setPhotoD}/>
               </div>
            </div>
         </div>
      </div>
   );
}

export default PhotoGallery;
