import Head from "next/head";
import Navbar from "../../../layouts/Navbar";
import styles from "./cosmouse.module.scss";

import ReloadNetworkButton from "../../../components/COSMOUSE/ReloadNetworkButton/ReloadNetworkButton";
import NodeRangeInput from "../../../components/COSMOUSE/NodeRangeInput/NodeRangeInput";
import { createContext, useEffect, useRef, useState } from "react";
import DropdownOptions from "../../../components/COSMOUSE/DropdownOptions/DropdownOptions";
import MainPanel from "../../../components/COSMOUSE/MainPanel/MainPanel";

import { GraphContext } from "../../../lib/contexts";

function Cosmouse() {

   const nodeCount = useRef(10)
   const geneOptions = useRef(['TP53', 'BRCA1', 'KRAS', 'MDM2', 'TRIM28', 'MYC', 'CTNNB1'].sort())

   const [selectedGene, setSelectedGene] = useState(geneOptions.current[0])
   const [graphData, setGraphData] = useState({graph: null, structuresInStage: false})

   async function handleReloadNetwork() {
      const urlParams = {
         gene: selectedGene,
         nodes: nodeCount.current,
         scorechannels: 'score'
      }

      // fallback to loading state
      setGraphData({graph: null, structuresInStage: false})

      const urlObject = new URLSearchParams(urlParams)
      const requestUrl = '/api/ppi?' + urlObject.toString()
      const response = await fetch(requestUrl)
      
      if (response.status === 200) {
         const responseJSON = await response.json()
         responseJSON.queryNode = selectedGene
         setGraphData(responseJSON)
      } else if (response.status === 204) {
         alert(`${response.status}: gene not found in database`)
      }

   }
   
   function handleNodeCountChange(value) {
      nodeCount.current = value
   }

   function handleGeneSelect(gene) {
      setSelectedGene(gene)
   }

   // fetch data on page load
   useEffect(() => {

      const urlParams = {
         gene: selectedGene,
         nodes: nodeCount.current,
         scorechannels: 'score'
      }

      const urlObject = new URLSearchParams(urlParams)
      const requestUrl = '/api/ppi?' + urlObject.toString()
      const response = fetch(requestUrl)

      response.then(res => {
         if (res.status === 200) {
            const responseJSON = res.json()
            responseJSON.then(data => {
               data.queryNode = selectedGene
               setGraphData(data)
            })
         } else if (res.status === 204) {
            alert(`${res.status}: gene not found in database`)
         }
      })
      
   }, [])

   return (
      <>
         <Head>
            <title>Elbert - Cosmouse Demo</title>
         </Head>
         <Navbar>
            <div className={styles.containerBox}>
               <div className={styles.infoPanel}>
                  <div className={styles.geneSelection}>
                     <DropdownOptions fontSize='50%' options={geneOptions.current} notifySelect={handleGeneSelect}/>
                  </div>
                  <div className={styles.geneInfo}>
                     <span>{selectedGene}</span>
                     <p>
                        {geneAnnotation[selectedGene]}
                     </p>
                  </div>
                  <div className={styles.ajaxControls}>
                     <NodeRangeInput labelText='NODES TO DISPLAY' fontSize='50%' range={[1,50]} notifyChange={handleNodeCountChange}/>
                     <ReloadNetworkButton text='RELOAD INTERACTION NETWORK' notifyClick={handleReloadNetwork} fontSize='50%'/>
                  </div>
               </div>
               <GraphContext.Provider value={graphData}>
                  <div className={styles.demoPanel}>
                     <MainPanel structuresInStage={graphData.structuresInStage}/>
                  </div>
               </GraphContext.Provider>
            </div>
         </Navbar>
      </>
   );
}

export default Cosmouse;


const geneAnnotation = {
   TP53: 'Guardian of the genome. TP53 is involved in multiple areas of cell cycle control, growth arrest, and apoptosis in response to environmental stressors and genetic damage. It is one of the most frequently mutated genes in cancer histologies. Loss of TP53 function is permissive for the uncontrolled proliferation of somatic cells with poor DNA replication fidelity - increasing inherited mutation rates of the lineage to eventually give rise to malignant cellular behaviour.',
   BRCA1: 'Breast Cancer Associated Protein 1. BRCA1 coordinates a diverse range of cellular pathways such as DNA damage repair, ubiquitination and transcriptional regulation to maintain genomic stability. Contributes to homologous recombination repair (HRR) via its direct interaction with PALB2, fine-tunes recombinational repair partly through its modulatory role in the PALB2-dependent loading of BRCA2-RAD51 repair machinery at DNA breaks.',
   KRAS: 'Ras proteins bind GDP/GTP and possess intrinsic GTPase activity. Plays a role in promoting oncogenic events by inducing transcriptional silencing of tumor suppressor genes (TSGs) in colorectal cancer (CRC) cells in a ZNF304-dependent manner.',
   MDM2: 'Murine Double Minute 2 gene. Inhibitor of P53. Activity increases upon passing cell cycle checkpoints to downregulate P53 levels, permitting progression into the proliferative growth phases.',
   TRIM28: 'Embryonic proto-oncogene responsible for stemness maintenance and cell proliferation by enforcing a transcriptionally repressive state of lineage-specific genes in undifferentiated embryonic stem cells. Post-natal overexpression in somatic cells frequently leads to chemotherapy-resistant cancers and increased tumour malignancy.',
   MYC: "Transcription factor that binds DNA in a non-specific manner, yet also specifically recognizes the core sequence 5'-CAC[GA]TG-3'. Activates growth-related genes. Regulator of somatic reprogramming and controls the self-renewal of embryonic stem cells.",
   CTNNB1: 'Beta-catenin 1. Key downstream component of the canonical Wnt signaling pathway. Involved in the regulation of cell adhesion, as component of an E-cadherin:catenin adhesion complex. Beta-catenin has been shown to promote cancer cell metastasis by dysregulating the expression of genes involved in cell adhesion and cytoskeletal dynamics, which are necessary for cells to move and invade surrounding tissues.'
}
