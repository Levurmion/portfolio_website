import styles from "./LegendsPanel.module.scss";
import LegendNode from "./LegendNode/LegendNode";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const normalModeColors = {
   QUERY: "#ee5d6c",
   DIRECT: "#8e7fe3",
   INDIRECT: "#f5c889",
};

const expressionModeColors = {
   HIGH: "#178967",
   MEDIUM: "#52ba69",
   LOW: "#a2d88f",
   DETECTED: "#368de3",
   NO_DATA: "#c2a5a5",
};

function LegendsPanel({ mode }) {

   function renderNodes() {
      if (mode === 'normal') {
         const labels = Object.keys(normalModeColors)
         return labels.map(label => {
            return <LegendNode key={label} nodeColor={normalModeColors[label]} labelText={label.replace('_',' ')} />
         })
      } else if (mode === 'expression') {
         const labels = Object.keys(expressionModeColors)
         return labels.map(label => {
            return <LegendNode key={label} nodeColor={expressionModeColors[label]} labelText={label.replace('_',' ')} />
         })
      }
   }

   return (
      <div className={styles.legendsPanel}>
         <div className={styles.legendsTitle}>
            <InfoOutlinedIcon fontSize='1.2vw' />
            <span>LEGENDS</span>
         </div>
         <div className={styles.legendIconsRow}>
            {renderNodes()}
         </div>
      </div>
   );
}

export default LegendsPanel;
