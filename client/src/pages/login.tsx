import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../components/header';
import Footer from '../components/footer';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useState,  useEffect } from "react";
import { loginUser } from "../slices/authSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [user, setUser] = useState({
    email: "",
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
      email: string; 
      password: string; 
    };
  
    setUser(newUser);

    dispatch(loginUser(user) as any);
  };
  return (
    <div className="Login">
      <header>
        <Navbar />
      </header>
      <main>
        <div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Password" />
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
