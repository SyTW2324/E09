import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './footer.css';

function FooterBar() {
  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light" className="footer-bar">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="me-auto mx-auto">
            <Nav.Link href="#home" className="footer-link">Contact</Nav.Link>
            <Nav.Link href="#features" className="footer-link">About us</Nav.Link>
            <Nav.Link href="#pricing" className="footer-link">Newsletter</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default FooterBar;