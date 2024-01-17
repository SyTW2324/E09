import React, { useState,  useEffect } from "react";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, loadUser } from "../slices/authSlice";
import "./CSS/login.css";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
    if (auth.userLoaded && auth.token) {
      navigate('/user');
    } else {
      navigate('/register');
    }
  }, [dispatch, auth.userLoaded, auth.token, navigate]);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    dni: "",
    password: "",
    _id: "",
  });

  const handleSubmit = async () => {

    console.log("################################");
    console.log(user);
    console.log("################################");

    // Enviar la solicitud al servidor y manejar la respuesta
    const response = await dispatch(registerUser(user) as any);


    // Verificar si el registro fue exitoso
    if (response.payload && response.payload._id) {
      // Iniciar sesión después del registro
      setUser(response.payload);
    }
    
    await dispatch(loginUser(user) as any);
    // Redirigir al usuario a la página deseada (puede ser /user o cualquier otra)
    navigate("/user");
 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-container">
      <header>
        <Navbar />
      </header>
      <div className="body-container">
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              <MDBCol md="6">
                <MDBCardImage
                  src="https://png2.cleanpng.com/sh/6cf268431859ced3dde6654e104fd4d3/L0KzQYm3VMA0N51AfZH0aYP2gLBuTgV0baMye9H2cIX3dcO0ifNwdqQygdDvb4LwccXwjB4ua51uiJ9qcoSwc7Frhb02aZQ4UKQDZHXlRYO7Ur4yPWQ5UKYAMUG4QoOAVsI0QGIATqUELoDxd1==/kisspng-user-computer-icons-information-clip-art-code-5ac3828deb5242.1534845115227623819639.png"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column form-container">
                  <div className="d-flex flex-row mt-2">
                    <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <span className="h1 fw-bold mb-0">REGISTER</span>
                  </div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Create an account
                  </h5>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    id="formControlLgname"
                    type="name"
                    size="lg"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                   <MDBInput
                    wrapperClass="mb-4"
                    label="Surname"
                    id="formControlLgsurname"
                    type="surname"
                    size="lg"
                    name="surname"
                    value={user.surname}
                    onChange={handleChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="formControlLgusername"
                    type="username"
                    size="lg"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                   <MDBInput
                    wrapperClass="mb-4"
                    label="DNI"
                    id="formControlLgdni"
                    type="dni"
                    size="lg"
                    name="dni"
                    value={user.dni}
                    onChange={handleChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email"
                    id="formControlLguser"
                    type="email"
                    size="lg"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLgpassword"
                    type="password"
                    size="lg"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Register
                  </MDBBtn>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#393f81" }}>
                      Login here
                    </Link>
                  </p>
                  <div className="d-flex flex-row justify-content-start">
                    <a href="#!" className="small text-muted me-1">
                      Terms of use.
                    </a>
                    <a href="#!" className="small text-muted">
                      Privacy policy
                    </a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Register;
