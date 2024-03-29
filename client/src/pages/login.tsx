// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loadUser } from "../slices/authSlice";
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

// Functional component for the login page
function Login() {
  // Initialize variables and hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  
  // State for the user data (email and password)
  const [user, setUser] = useState({
    email: "",
    password: "",
  }); 
  
  // useEffect hook for component lifecycle events
  useEffect(() => {
    // Load user data and redirect based on authentication status
    dispatch(loadUser());
    if (auth.userLoaded && auth.token) {
      navigate('/user');
    } else {
      navigate('/login');
    }
  }, [dispatch, auth.userLoaded, auth.token, navigate]);

  // Function to handle form submission
  const handleSubmit = () => {
    dispatch(loginUser(user) as any);
  };

  // Function to handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Return JSX for the Login component
  return (
    <div className="main-container">
      <header>
        {/* Include the navigation component */}
        <Navbar />
      </header>
      <div className="body-container">
        {/* Container for the login form */}
        <MDBContainer className="my-5">
          <MDBCard>
            <MDBRow className="g-0">
              {/* Image column */}
              <MDBCol md="6">
                <MDBCardImage
                  src="https://png2.cleanpng.com/sh/6cf268431859ced3dde6654e104fd4d3/L0KzQYm3VMA0N51AfZH0aYP2gLBuTgV0baMye9H2cIX3dcO0ifNwdqQygdDvb4LwccXwjB4ua51uiJ9qcoSwc7Frhb02aZQ4UKQDZHXlRYO7Ur4yPWQ5UKYAMUG4QoOAVsI0QGIATqUELoDxd1==/kisspng-user-computer-icons-information-clip-art-code-5ac3828deb5242.1534845115227623819639.png"
                  alt="login form"
                  className="rounded-start w-100"
                />
              </MDBCol>
              {/* Login form column */}
              <MDBCol md="6">
                <MDBCardBody className="d-flex flex-column form-container">
                  {/* Header and subheading */}
                  <div className="d-flex flex-row mt-2">
                    <MDBIcon
                      fas
                      icon="cubes fa-3x me-3"
                      style={{ color: "#ff6219" }}
                    />
                    <span className="h1 fw-bold mb-0">LOGIN</span>
                  </div>
                  <h5
                    className="fw-normal my-4 pb-3"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sign into your account
                  </h5>
                  {/* Email input field */}
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
                  {/* Password input field */}
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
                  {/* Login button */}
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Login
                  </MDBBtn>
                  {/* Link to register */}
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?{" "}
                    <Link to="/register" style={{ color: "#393f81" }}>
                      Register here
                    </Link>
                  </p>
                  {/* Terms of use and privacy policy links */}
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
      {/* Footer section with the Footer component */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

// Export the Login component as the default export
export default Login;
