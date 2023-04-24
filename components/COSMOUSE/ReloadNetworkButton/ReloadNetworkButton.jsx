import styles from './ReloadNetworkButton.module.scss';

function ReloadNetworkButton({ text, notifyClick, fontSize }) {

   return ( 
      <div className={styles.reloadNetworkButton} onClick={() => {notifyClick()}} style={{fontSize}}>{text}</div>
    );
}

export default ReloadNetworkButton;