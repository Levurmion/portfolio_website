import PhotoFrame from "../../../components/PhotoFrame/PhotoFrame";
import PhotoGallery from "../../../components/PhotoGallery/PhotoGallery";
import Navbar from "../../../layouts/Navbar";
import styles from "./projects.module.scss";

export default function Project({ projectDetails }) {
   return (
      <Navbar>
         <div className={styles.projectPage}>
            <div className={styles.pageContent}>
               <div className={styles.photoGallery}>
                  <PhotoGallery />
               </div>
               <div className={styles.description}></div>
            </div>
         </div>
      </Navbar>
   );
}
