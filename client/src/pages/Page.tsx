import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Page.module.css";

const Page: FunctionComponent = () => {
  const navigate = useNavigate();

  const onFrameContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onFrameContainer1Click = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.landingPage}>
        <div className={styles.frame}>
          <div className={styles.negativeNavbar}>
            <div className={styles.logo}>
                <img className={styles.outputOnlinepngtools1Icon} alt="" src="/outputonlinepngtools-1@2x.png"/>
                <div className={styles.yourJourneyYour}>
                  Your Journey. Your Way
                </div>
                <div className={styles.odyssey}>
                  <p className={styles.odyssey1}>ODYSSEY</p>
                </div>
             
            </div>
            <div className={styles.loginsignup}>
              <div className={styles.loginWrapper} onClick={onFrameContainerClick}>
                <div className={styles.login}>Login</div>
              </div>
              <div className={styles.loginWrapper} onClick={onFrameContainer1Click} >
                <div className={styles.login}>SignUp</div>
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <div className={styles.frame1}>
              <div className={styles.frame2}>
                <div className={styles.cheapHousing}>Cheap housing</div>
              </div>
            </div>
            <div className={styles.frame3}>
              <div className={styles.thisInnovativeCompany}>
                This innovative company redefines hospitality by diverse and
                unique accommodations, connecting travelers with authentic
                experiences.
              </div>
              <img className={styles.casasIcon} alt="" src="/casas@2x.png" />
            </div>
          </div>
        </div>
        <div className={styles.frame4}>
          <div className={styles.background1} />
          <img className={styles.backgroundModified11} alt="" src="/backgroundmodified-1-1@2x.png" />
        </div>
      </div>
    </div>
  );
};

export default Page;
