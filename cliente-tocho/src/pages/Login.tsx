import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onLoginSignupContainerClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const onNeededAccountContainerClick = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className={styles.login}>
      <img
        className={styles.backgroundModified11}
        alt=""
        src="/backgroundmodified-1-1@2x.png"
      />
      <div className={styles.frame}>
        <div className={styles.negativeNavbar}>
          <div className={styles.logo} onClick={onLogoContainerClick}>
            <div className={styles.yourJourneyYour}>Your Journey. Your Way</div>
            <div className={styles.odyssey}>
              <p className={styles.odyssey1}>ODYSSEY</p>
            </div>
            <img
              className={styles.outputOnlinepngtools1Icon}
              alt=""
              src="/outputonlinepngtools-1@2x.png"
            />
          </div>
          <div
            className={styles.loginsignup}
            onClick={onLoginSignupContainerClick}
          >
            <div className={styles.signupWrapper}>
              <div className={styles.signup}>SignUp</div>
            </div>
          </div>
        </div>
        <div className={styles.popUpLogIn}>
          <div
            className={styles.neededAccount}
            onClick={onNeededAccountContainerClick}
          >
            <div className={styles.neededAccountChild} />
            <div className={styles.vectorParent}>
              <img
                className={styles.frameChild}
                alt=""
                src="/rectangle-10.svg"
              />
              <div className={styles.neededAnAccountContainer}>
                <span>{`Needed an account? `}</span>
                <span className={styles.signup1}>SIGNUP</span>
              </div>
            </div>
          </div>
          <div className={styles.button}>
            <img className={styles.buttonChild} alt="" src="/rectangle-9.svg" />
            <div className={styles.login1}>Login</div>
          </div>
          <div className={styles.inputs}>
            <div className={styles.inputsChild} />
            <div className={styles.password}>pASSWORD</div>
            <div className={styles.inputsItem} />
            <div className={styles.email}>eMAIL</div>
          </div>
          <div className={styles.login2}>Login</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
