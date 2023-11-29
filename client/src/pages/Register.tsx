import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

const Register: FunctionComponent = () => {
  const navigate = useNavigate();

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onFrameContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onAccountAlreadyContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className={styles.register}>
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
          <div className={styles.loginWrapper} onClick={onFrameContainerClick}>
            <div className={styles.login}>Login</div>
          </div>
        </div>
        <div className={styles.popUpRegister}>
          <div
            className={styles.accountAlready}
            onClick={onAccountAlreadyContainerClick}
          >
            <img
              className={styles.accountAlreadyChild}
              alt=""
              src="/rectangle-10.svg"
            />
            <div className={styles.alreadyAnAccountContainer}>
              <span>{`Already an account?   `}</span>
              <span className={styles.login1}>LogIN</span>
            </div>
            <div className={styles.accountAlreadyItem} />
          </div>
          <div className={styles.button}>
            <img className={styles.buttonChild} alt="" src="/rectangle-9.svg" />
            <div className={styles.register1}>
              <p className={styles.odyssey1}>Register</p>
            </div>
          </div>
          <div className={styles.inputs}>
            <div className={styles.nombreParent}>
              <div className={styles.nombre}>Nombre</div>
              <div className={styles.frameChild} />
            </div>
            <div className={styles.appellidosParent}>
              <div className={styles.appellidos}>Appellidos</div>
              <div className={styles.frameItem} />
            </div>
            <div className={styles.usuarioParent}>
              <div className={styles.usuario}>Usuario</div>
              <div className={styles.frameChild} />
            </div>
            <div className={styles.emailParent}>
              <div className={styles.email}>Email</div>
              <div className={styles.frameItem} />
            </div>
            <div className={styles.dniParent}>
              <div className={styles.dni}>DNI</div>
              <div className={styles.frameItem} />
            </div>
            <div className={styles.contraseaParent}>
              <div className={styles.contrasea}>Contraseña</div>
              <div className={styles.frameChild2} />
            </div>
          </div>
          <div className={styles.register3}>Register</div>
        </div>
      </div>
    </div>
  );
};

export default Register;
