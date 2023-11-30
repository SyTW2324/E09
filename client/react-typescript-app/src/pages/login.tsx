import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/header';
import Footer from '../components/footer';

function Login() {
  return (
    <div className="Login">
      <header>
        <Navbar />
      </header>
      <main>
        <div className="custom-form">
          <Form className="custom-form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Nombre</Form.Label> */}
            <Form.Control type="email" placeholder="Nombre" />
            <Form.Control type="email" placeholder="Apellido" />
            <Form.Control type="email" placeholder="Usuario" />
            <Form.Control type="email" placeholder="Email" />
            <Form.Control type="email" placeholder="DNI" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Contraseña" />
            <Form.Control type="password" placeholder="Confirmar contraseña" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </div>
      
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Login;
