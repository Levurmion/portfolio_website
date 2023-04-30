import CytoscapePanel from '../CytoscapePanel/CytoscapePanel';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './MainPanel.module.scss'
import DropdownOptions from '../DropdownOptions/DropdownOptions';
import Slider from '../Slider/Slider';
import ToggleButton from '../ToggleButton/ToggleButton';
import { useEffect, useLayoutEffect, useState } from 'react';

import TuneIcon from '@mui/icons-material/Tune';

function MainPanel({ structuresInStage }) {

   const [ structures, setStructures ] = useState(['fetching graph...'])

   // Cytoscape parameters (props)
   const [ stage, setStage ] = useState(1)
   const [ selectedStructure, setSelectedStructure ] = useState('Max TPM')
   const [ secondaryInt, setSecondaryInt ] = useState(true)
   const [ expressionData, setExpressionData ] = useState(false)
   const [ confidence, setConfidence ] = useState(0.4)
   const [ aboveConf, setAboveConf ] = useState(true)
   const [ dropNodes, setDropNodes ] = useState(false)

   function handleSelectStructure(option) {
      setSelectedStructure(option)
   }

   function handleStageSlider(stage) {
      updateStructuresForStage(stage)
   }

   function updateStructuresForStage(stage) {
      if (structuresInStage !== false) {
         const newStructures = structuresInStage[stage]
         setStage(stage)
         setSelectedStructure('Max TPM')
         if (newStructures !== undefined) {
            const structureStateCopy = [...newStructures]
            structureStateCopy.unshift('Max TPM')
            setStructures(structureStateCopy)
         } else {
            setStructures(['Max TPM'])
         }
      }
   }

   // when new structures come in response to user request, re-initialize
   useLayoutEffect(() => {
      if (!structuresInStage) {
         setStructures(['fetching graph...'])
      } else {
         updateStructuresForStage(stage)
      }
   }, [structuresInStage])

   return ( 
      <div className={styles.mainPanel}>
         <CytoscapePanel 
            secondaryInt={secondaryInt} 
            confidence={confidence}
            aboveConf={aboveConf}
            dropNodes={dropNodes}
            expressionData={expressionData}
            stage={stage}
            selectedStructure={selectedStructure}/>
         <OptionsPanel>
            <div className={styles.optionsTitle}>
               <TuneIcon fontSize='1.2vw'/>
               <span>GRAPH CONTROLS</span>
            </div>
            <div className={styles.toggleSwitches}>
               <div className={styles.toggleSwitch}>
                  <ToggleSwitch label='SECONDARY INTERACTIONS' textColor='#000000' defaultState={true} fontSize='1.2vw' notifyToggle={(state) => {setSecondaryInt(state)}}/>
               </div>
               <div className={styles.toggleSwitch}>
                  <ToggleSwitch label='EXPRESSION DATA' textColor='#000000' defaultState={false} fontSize='1.2vw' notifyToggle={(state) => {setExpressionData(state)}}/>
               </div>
            </div>
            <div className={styles.expressionDropdown}>
               <div className={styles.label}>SELECT A STAGE & STRUCTURE</div>
               <DropdownOptions options={structures} fontSize={'1vw'} notifySelect={handleSelectStructure}/>
               <div className={styles.slider}>
                  <Slider range={[1,26]} interval={1} displayText={'CS'} notifyChange={handleStageSlider}/>
               </div>
            </div>
            <div className={styles.confidenceOptions}>
               <div className={styles.label}>
                  SELECT A CONFIDENCE THRESHOLD
               </div>
               <div className={styles.buttonsRow}>
                  <div className={styles.buttonWrapper}>
                     <ToggleButton defText={'ABOVE'} altText={'BELOW'} fontSize={'1.2vw'} notifyToggle={() => {setAboveConf(state => !state)}}/>
                  </div>
                  <div className={styles.buttonWrapper}>
                     <ToggleButton defText={'ALL NODES'} altText={'DROP NODES'} fontSize={'1.2vw'} notifyToggle={() => {setDropNodes(state => !state)}}/>
                  </div>
               </div>
               <div className={styles.confidenceSlider}>
                  <Slider range={[0.001,0.999]} defaultVal={0.4} notifyChange={(confidence) => {setConfidence(confidence)}}/>
               </div>
            </div>
            
         </OptionsPanel>
      </div>
    );
}

export default MainPanel;