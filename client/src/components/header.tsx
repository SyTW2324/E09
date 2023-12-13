  import React, { useState, useEffect } from 'react';
  import Button from 'react-bootstrap/Button';
  import Container from 'react-bootstrap/Container';
  import Form from 'react-bootstrap/Form';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import logoImage1 from '../imgs/full_logo.png';
  import logoImage2 from '../imgs/only_logo.png';
  import { Link } from 'react-router-dom';
  import { useDispatch, useSelector } from "react-redux";
  import { logoutUser } from "../slices/authSlice";

  import './header.css';

function NavScroll() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  let auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollThreshold = 100;
    setIsScrolled(scrollTop > scrollThreshold);
  };

  const handleResize = () => {
    const mobileThreshold = 768;
    const isMobile = window.innerWidth <= mobileThreshold;
    setIsMobile(isMobile);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    // Actualizar el estado isLoggedIn cuando authToken cambie
    setIsLoggedIn(!!localStorage.getItem('token'));
    console.log("token:");
    console.log(localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  const handleLogout = () => {
    // Lógica para realizar el logout (eliminar token, limpiar el estado, etc.)
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  
    // Eliminamos al usuario por completo
    localStorage.removeItem('user');
  
    // Dispatch para actualizar el estado auth
    dispatch(logoutUser());

    console.log("Usuario borrado");

  };

  const logoImage = isMobile ? logoImage2 : isScrolled ? logoImage2 : logoImage1;
  const logoWidth = isMobile ? 90 : 300;
  const logoHeight = isMobile ? 62 : 62;

  return (
    <Navbar expand="lg" className={`custom-navbar-bg ${isScrolled ? 'scrolled' : ''}`}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoImage}
            width={logoWidth}
            height={logoHeight}
            className="d-inline-block align-top"
            alt="Odyssey Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {/* Resto del código para la navegación */}
          </Nav>
          <Form className="d-flex">
            {isLoggedIn ? (
              <Link to="/">
                <Button variant="outline-success" className="button-margin custom-button" onClick={handleLogout}>
                  LOGOUT
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline-success" className="button-margin custom-button">
                    LOGIN
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline-success" className="button-margin custom-button">
                    SIGNUP
                  </Button>
                </Link>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
