import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../slices/authSlice";

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
    _id: "",
  });

  useEffect(() => {
    if (auth._id) {
      navigate("/user");
    }
  }, [auth._id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const formData = new FormData(e.target as HTMLFormElement);
    const newUser = Object.fromEntries(formData.entries()) as {
      _id: string;
      name: string;
      surname: string;
      username: string;
      email: string;
      dni: string;
      password: string;
    };

    // Enviar la solicitud al servidor y manejar la respuesta
    const response = await dispatch(registerUser(newUser) as any);

    // Actualizar el estado del usuario con la respuesta del servidor
    if (response.payload && response.payload._id) {
      setUser(response.payload);
    }

    console.log("################################");
    console.log(newUser);
    
    // Utilizar el estado local directamente en la llamada a dispatch
    dispatch(loginUser(newUser) as any);

    console.log("################################");
    console.log(auth);
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
