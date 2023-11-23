import { FunctionComponent } from "react";
import styles from "./FrameLandingPage.module.css";

const FrameLandingPage: FunctionComponent = () => {
  return (
    <div className={styles.frameLandingPage}>
      <div className={styles.background}>
        <img
          className={styles.backgroundImageIcon}
          alt=""
          src="/background-image@2x.png"
        />
      </div>
      <div className={styles.nav}>
        <div className={styles.header} />
        <div className={styles.registrarse}>
          <div className={styles.registrarse1}>Registrarse</div>
        </div>
        <div className={styles.login}>
          <img
            className={styles.iniciarSesinLogo}
            alt=""
            src="/iniciar-sesin-logo@2x.png"
          />
        </div>
        <img className={styles.fullLogoIcon} alt="" src="/full-logo@2x.png" />
      </div>
    </div>
  );
};

export default FrameLandingPage;
