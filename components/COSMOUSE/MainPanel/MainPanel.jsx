import CytoscapePanel from '../CytoscapePanel/CytoscapePanel';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './MainPanel.module.scss'
import DropdownOptions from '../DropdownOptions/DropdownOptions';
import Slider from '../Slider/Slider';
import ToggleButton from '../ToggleButton/ToggleButton';

function MainPanel() {

   const exampleOptions = [
      'Max TPM',
      'embryo',
      'blastocyst',
      'this',
      'that',
      'whatever',
      'coding is hard',
      'what if the name is long',
      'scroll',
      'scroll',
      'scroll'
   ]

   function handleSelectStructure(option) {
      alert(option)
   }

   function handleStageSlider(stage) {
      console.log(stage)
   }

   return ( 
      <div className={styles.mainPanel}>
         <CytoscapePanel />
         <OptionsPanel>
            <div className={styles.optionsTitle}>
               <span>GRAPH CONTROLS</span>
            </div>
            <div className={styles.toggleSwitches}>
               <div className={styles.toggleSwitch}>
                  <ToggleSwitch label='SECONDARY INTERACTIONS' textColor='#000000' defaultState={true} fontSize='1.2vw'/>
               </div>
               <div className={styles.toggleSwitch}>
                  <ToggleSwitch label='EXPRESSION DATA' textColor='#000000' defaultState={false} fontSize='1.2vw'/>
               </div>
            </div>
            <div className={styles.expressionDropdown}>
               <div className={styles.label}>SELECT A STAGE & STRUCTURE</div>
               <DropdownOptions options={exampleOptions} fontSize={'1vw'} notifySelect={handleSelectStructure}/>
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
                     <ToggleButton defText={'ABOVE'} altText={'BELOW'} fontSize={'1.2vw'} notifyToggle={() => {console.log('clicked!')}}/>
                  </div>
                  <div className={styles.buttonWrapper}>
                     <ToggleButton defText={'ALL NODES'} altText={'DROP NODES'} fontSize={'1.2vw'} notifyToggle={() => {console.log('clicked!')}}/>
                  </div>
               </div>
               <div className={styles.confidenceSlider}>
                  <Slider range={[0.001,0.999]} notifyChange={handleStageSlider}/>
               </div>
            </div>
            
         </OptionsPanel>
      </div>
    );
}

export default MainPanel;