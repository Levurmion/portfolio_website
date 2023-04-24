import CytoscapePanel from '../CytoscapePanel/CytoscapePanel';
import styles from './MainPanel.module.scss'

function MainPanel() {
   return ( 
      <div className={styles.mainPanel}>
         <CytoscapePanel />
      </div>
    );
}

export default MainPanel;