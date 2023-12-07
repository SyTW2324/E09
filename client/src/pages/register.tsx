import Navbar from '../components/header';
import Footer from '../components/footer';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../slices/authSlice";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    dni: "",
    password: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/user");
    }
  }, [auth._id, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData.entries()) as { 
      name: string; 
      surname: string; 
      username: string; 
      email: string; 
      dni: string; 
      password: string; 
    };
  
    setUser(newUser);

    dispatch(registerUser(user) as any);
  };
 
  return (
    <div className="Login">
      <header>
          <Navbar />
      </header>
      <main>
        <div className="custom-form">
          <Form className="custom-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" name="name" placeholder="Nombre" />
              <Form.Control type="text" name="surname" placeholder="Apellido" />
              <Form.Control type="text" name="username" placeholder="Usuario" />
              <Form.Control type="email" name="email" placeholder="Email" />
              <Form.Control type="text" name="dni" placeholder="DNI" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" name="password" placeholder="Contraseña" />
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

export default Register;
