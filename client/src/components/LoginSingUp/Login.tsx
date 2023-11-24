import React from 'react';
import './LoginSignUp.css'

function Login() {
  return (
    <div className='container'>
        <div className='header'>
            <div className="text"> Login </div>
            <div className="underline"></div>
            <div className="inputs">
                <div className="input">
                    <input type='text'  placeholder='Usuario'/>
                </div>
                <div className="input" >
                    <input type='password' placeholder='Contraseña'/>
                </div>
            </div>
            <div className="forgot-password">
                Recupera la contraseña
            </div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    </div>
  );
}

export default Login;