import { useEffect } from "react";
import PhotoFrame from "../../../components/PhotoFrame/PhotoFrame";
import { motion, AnimatePresence } from "framer-motion";
import PhotoGallery from "../../../components/PhotoGallery/PhotoGallery";
import CytoscapeIconColored from "../../../icons/CytoscapeIconColored";
import DjangoIconColored from "../../../icons/DjangoIconColored";
import MySQLIconColored from "../../../icons/MySQLIconColored";
import NivoChartsIconColored from "../../../icons/NivoChartsIconColored";
import ReactIconColored from "../../../icons/ReactIconColored";
import PythonIconColored from "../../../icons/PythonIconColored";
import NumpyIconColored from "../../../icons/NumpyIconColored";
import NextIconColored from "../../../icons/NextIconColored";
import PostgreSQLColored from "../../../icons/PostgreSQLIconColored";
import PandasIconColored from "../../../icons/PandasIconColored";
import Navbar from "../../../layouts/Navbar";
import styles from "./projectsPage.module.scss";
import { getAllProjectIds, getProjectData } from "../../../lib/project-utils.mjs";
import { uniqueKeyGenerator } from "../../../lib/utilities.mjs";

const techIcons = {
   Django: <DjangoIconColored />,
   Cytoscape: <CytoscapeIconColored />,
   MySQL: <MySQLIconColored />,
   NivoCharts: <NivoChartsIconColored />,
   React: <ReactIconColored />,
   Python: <PythonIconColored />,
   Pandas: <PandasIconColored />,
   Numpy: <NumpyIconColored />,
   Next: <NextIconColored />,
   PostgreSQL: <PostgreSQLColored />,
};

const galleryAnim = {
   initial: { x: "-5vw", opacity: 0 },
   entry: { x: 0, opacity: 1 },
};

const descriptionAnim = {
   initial: { x: "2vw", opacity: 0 },
   entry: { x: 0, opacity: 1 },
};

export default function Project({ projectData }) {
   const keyGenerator = uniqueKeyGenerator();

   

   return (
      <Navbar>
         <div className={styles.projectPage}>
            <div className={styles.pageContent}>
               <AnimatePresence>
                  <div className={styles.mobileHeader}>{projectData.header}</div>
                  <div className={styles.mobileSubheader}>{projectData.subheader}</div>
                  <motion.div
                     className={styles.photoGallery}
                     initial={galleryAnim.initial}
                     animate={galleryAnim.entry}
                     transition={{ type: "tween", duration: 0.5 }}>
                     <PhotoGallery imageURLs={projectData.imageURLs} />
                  </motion.div>
                  <motion.div
                     className={styles.description}
                     initial={descriptionAnim.initial}
                     animate={descriptionAnim.entry}
                     transition={{ type: "tween", duration: 0.5, delay: 0.25 }}>
                     <div className={styles.header}>{projectData.header}</div>
                     <div className={styles.subheader}>{projectData.subheader}</div>
                     <div className={styles.techIcons}>
                        {projectData.techStack.map((icon) => {
                           return techIcons[icon];
                        })}
                     </div>
                     <div className={styles.pointers}>
                        <ul>
                           {projectData.pointers.map((point) => {
                              return <li key={keyGenerator("point")}>{point}</li>;
                           })}
                        </ul>
                     </div>
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </Navbar>
   );
}

// get data for the selected path
export async function getStaticProps({ params }) {
   const projectData = getProjectData(params.projectID);
   return {
      props: {
         projectData,
      },
   };
}

// get all possible dynamic paths
export async function getStaticPaths() {
   const paths = getAllProjectIds();
   return { paths, fallback: false };
}
