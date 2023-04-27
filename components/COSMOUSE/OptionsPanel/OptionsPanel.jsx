import styles from './OptionsPanel.module.scss'


// HOC to keep option controls directly accessible within MainPanel.jsx
function OptionsPanel({ children }) {
   return ( 
      <div className={styles.optionsPanel}>
         {children}
      </div>
   );
}

export default OptionsPanel;