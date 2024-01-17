// Import React and necessary Bootstrap components
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Import logo images and Link component from react-router-dom
import logoImage1 from '../imgs/full_logo.png';
import logoImage2 from '../imgs/LogoMin_Colored.svg';
import { Link } from 'react-router-dom';

// Import Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import default_user_logo from '../imgs/user.png'; // Default user logo image

// Import custom styles
import './header.css';

// Functional component for the navbar with scrolling and dynamic content
function NavScroll() {
  // State variables for scroll, mobile view, and login status
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Redux state and dispatch
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  // Event handler for scrolling
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const scrollThreshold = 100;
    setIsScrolled(scrollTop > scrollThreshold);
  };

  // Event handler for window resize
  const handleResize = () => {
    const mobileThreshold = 768;
    const isMobile = window.innerWidth <= mobileThreshold;
    setIsMobile(isMobile);
  };

  // useEffect to add and remove event listeners for scroll and resize
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // useEffect to handle initial resizing
  useEffect(() => {
    handleResize();
  }, []);

  // useEffect to update isLoggedIn state when authToken changes
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [localStorage.getItem('token')]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    dispatch(logoutUser());
    console.log("Usuario borrado");
  };

  // Determine which logo image to display based on mobile view and scroll status
  const logoImage = isMobile ? logoImage2 : isScrolled ? logoImage2 : logoImage1;
  const logoWidth = isMobile ? 90 : 300;
  const logoHeight = isMobile ? 62 : 62;

  // Return the responsive Navbar component with dynamic content
  return (
    <Navbar expand="lg" className={`custom-navbar-bg ${isScrolled ? 'scrolled' : ''}`}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {/* Display the logo image */}
          <img
            src={logoImage}
            width={logoWidth}
            height={logoHeight}
            className="d-inline-block align-top"
            alt="Odyssey Logo"
          />
        </Navbar.Brand>
        {/* Navbar toggler for mobile view */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        {/* Navbar content */}
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {/* Additional navigation content can be added here */}
          </Nav>
          {/* Right-aligned form for buttons */}
          <Form className="d-flex">
            {/* Conditional rendering of login/logout buttons and user profile image */}
            {isLoggedIn ? (
              <>
                <Link to="/">
                  <Button variant="outline-success" className="button-margin custom-button" onClick={handleLogout}>
                    LOGOUT
                  </Button>
                </Link>
                <Link to="/user">
                  <Button variant="outline-success" className="button-margin custom-button">
                  {/* Display user profile image or default logo if not available */}
                  <img src={auth.image ? default_user_logo : auth.img} alt="foto de perfil" className="d-block ui-w-25 rounded-circle"/>
                  </Button>
                </Link>
              </>
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

// Export the NavScroll component
export default NavScroll;
