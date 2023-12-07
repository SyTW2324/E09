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
import "./CSS/user.css";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);

  const [user, setUser] = useState({
    name: "Pedro",
    surname: "Comekk",
    username: "Aslkdj",
    email: "alojomora@mora.com",
    dni: "asdasd",
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
      image: "https://bootdey.com/img/Content/avatar/avatar1.png";
    };
  
    setUser(newUser);

    dispatch(registerUser(user) as any);
  };
 
  return (
    <div className="User">
      <header>
          <Navbar />
      </header>
      <main>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container bootdey flex-grow-1 container-p-y">
                  <div className="media align-items-center py-3 mb-3">
                    <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="d-block ui-w-100 rounded-circle"/>
                    <div className="media-body ml-4">
                      <h4 className="font-weight-bold mb-0">{user.name} {user.surname} <span className="text-muted font-weight-normal">{user.email}</span></h4>
                      <a href="javascript:void(0)" className="btn btn-primary btn-sm">Edit</a>&nbsp;
                      <a href="javascript:void(0)" className="btn btn-default btn-sm icon-btn"><i className="fa fa-mail"></i></a>
                    </div>
                  </div>
                  <div className="card">
                    <hr className="border-light m-0"/>
                    <div className="card-body">
      
                      <table className="table user-view-table m-0">
                        <tbody>
                          <tr>
                            <td>Username:</td>
                            <td>{user.username}</td>
                          </tr>
                          <tr>
                            <td>Name:</td>
                            <td>{user.name} {user.surname}</td>
                          </tr>
                          <tr>
                            <td>E-mail:</td>
                            <td>{user.email}</td>
                          </tr>
                          <tr>
                            <td>DNI:</td>
                            <td>{user.dni}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Register;
