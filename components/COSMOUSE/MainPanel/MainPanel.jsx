import CytoscapePanel from '../CytoscapePanel/CytoscapePanel';
import OptionsPanel from '../OptionsPanel/OptionsPanel';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import styles from './MainPanel.module.scss'
import DropdownOptions from '../DropdownOptions/DropdownOptions';
import Slider from '../Slider/Slider';

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

   return ( 
      <div className={styles.mainPanel}>
         <CytoscapePanel />
         <OptionsPanel>
            <div className={styles.toggleSwitch}>
               <ToggleSwitch label='SECONDARY INTERACTIONS' textColor='#0d6c6d' defaultState={true}/>
            </div>
            <div className={styles.toggleSwitch}>
               <ToggleSwitch label='EXPRESSION DATA' textColor='#0d6c6d' defaultState={false}/>
            </div>
            <div className={styles.expressionDropdown}>
               <div className={styles.label}>SELECT A STAGE & STRUCTURE</div>
               <DropdownOptions options={exampleOptions} fontSize={'1vw'} notifySelect={handleSelectStructure}/>
            </div>
            <div className={styles.slider}>
               <Slider range={[1,26]} interval={1} displayText={'CS'}/>
            </div>
         </OptionsPanel>
      </div>
    );
}

export default MainPanel;