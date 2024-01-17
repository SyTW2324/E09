import Navbar from '../components/header';
import Footer from '../components/footer';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./CSS/user.css";

import default_user_logo from '../imgs/user.png';

function User() {
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (!auth._id) {
      navigate("/");
    }
    console.log(auth);
  }, [auth, navigate]);

  return (
    <div className="main-container">
  
      <header>
          <Navbar />
      </header>
      <main className='main'>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container bootdey flex-grow-1 container-p-y">
                    <div className="media align-items-center py-3 mb-3">
                    <img src={auth.image ? default_user_logo : auth.img} alt="foto de perfil" className="d-block ui-w-100 rounded-circle"/>
                      <div className="media-body ml-4">
                        <h4 className="font-weight-bold mb-0">{auth.name} {auth.surname} <span className="text-muted font-weight-normal">{auth.email}</span></h4>
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
                              <td>{auth.username}</td>
                            </tr>
                            <tr>
                              <td>Name:</td>
                              <td>{auth.name} {auth.surname}</td>
                            </tr>
                            <tr>
                              <td>E-mail:</td>
                              <td>{auth.email}</td>
                            </tr>
                            <tr>
                              <td>DNI:</td>
                              <td>{auth.dni}</td>
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

export default User;
