import Link from "next/link";
import styles from "./Navbar.module.scss";

function Navbar({ children }) {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.linkBox}>
          <Link className={styles.links} href='/'>
            Home
          </Link>
          <div className={styles.underliner}></div>
        </div>
        <div className={styles.linkBox}>
          <Link className={styles.links} href='/'>
            Github
          </Link>
          <div className={styles.underliner}></div>
        </div>
        <div className={styles.linkBox}>
          <Link className={styles.links} target='_blank' href='https://www.linkedin.com/in/elberttimothy' passHref={true}>
            LinkedIn
          </Link>
          <div className={styles.underliner}></div>
        </div>
        <div className={styles.linkBox}>
          <Link className={styles.links} href='/'>
            Contact
          </Link>
          <div className={styles.underliner}></div>
        </div>
      </div>
      {children}
    </>
  );
}

export default Navbar;