import { useState } from "react";

function ToggleButton({ defText, altText }) {

   const [defToggle, setDefToggle] = useState(True)

   return ( 
      <div className={styles.buttonWrapper}>
         <span></span>
      </div>
   );
}

export default ToggleButton;