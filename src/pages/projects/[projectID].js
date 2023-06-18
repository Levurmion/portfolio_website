import { useEffect, useState } from "react";
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
import FirebaseIconColored from "../../../icons/FirebaseIconColored";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Navbar from "../../../layouts/Navbar";
import styles from "./projectsPage.module.scss";
import { getAllProjectIds, getProjectData } from "../../../lib/project-utils.mjs";
import { uniqueKeyGenerator } from "../../../lib/utilities.mjs";
import Head from "next/head";
import Link from "next/link";

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
   Firebase: <FirebaseIconColored />
};

const galleryAnim = {
   initial: { x: "-2vw", opacity: 0 },
   entry: { x: 0, opacity: 1 },
};

const descriptionAnim = {
   initial: { x: "1vw", opacity: 0 },
   entry: { x: 0, opacity: 1 },
};

export default function Project({ projectData }) {
   const keyGenerator = uniqueKeyGenerator();

   const [isMobile, setIsMobile] = useState(null);

   useEffect(() => {
      setIsMobile(window.matchMedia("(max-width: 1024px),(pointer: coarse)").matches);
   }, []);

   return (
      <>
         <Head>
            <title>Elbert - {projectData.header}</title>
         </Head>
         <Navbar>
            {isMobile == null ? (
               <div className={styles.projectPage}></div>
            ) : (
               <div className={styles.projectPage}>
                  <div className={styles.pageContent}>
                     <AnimatePresence>
                        <div className={styles.mobileHeader}>{projectData.header}</div>
                        <div className={styles.mobileSubheader}>{projectData.subheader}</div>
                        <motion.div
                           className={styles.photoGallery}
                           initial={isMobile ? false : galleryAnim.initial}
                           animate={galleryAnim.entry}
                           transition={{ type: "tween", duration: 0.5 }}>
                           <PhotoGallery imageURLs={projectData.imageURLs} />
                        </motion.div>
                        <motion.div
                           className={styles.description}
                           initial={isMobile ? false : descriptionAnim.initial}
                           animate={descriptionAnim.entry}
                           transition={{ type: "tween", duration: 0.5, delay: 0.25 }}>
                           <div className={styles.header}>{projectData.header}</div>
                           <div className={styles.subheader}>{projectData.subheader}</div>
                           {projectData.demo !== undefined && isMobile === false ?
                           <Link className={styles.demoLink} href={projectData.demo}>
                              {projectData.linkText === undefined ? 'try the demo' : projectData.linkText} <ArrowRightAltIcon fontSize='inherit' />
                           </Link> : null}
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
            )}
         </Navbar>
      </>
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
