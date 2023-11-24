import React from 'react';
import './LoginSignUp.css'

function SignUp() {
    return (
      <div className='container'>
          <div className='header'>
              <div className="text"> Registro </div>
              <div className="underline"></div>
              <div className="inputs">
                  <div className="input">
                      <input type='text'  placeholder='Nombre'/>
                  </div>
                  <div className="input">
                      <input type='text'  placeholder='Apellido'/>
                  </div>
                  <div className="input">
                      <input type='text'  placeholder='Usuario'/>
                  </div>
                  <div className="input" >
                      <input type='email' placeholder='Email'/>
                  </div>
                  <div className="input" >
                      <input type='dni' placeholder='DNI'/>
                  </div>
                  <div className="input" >
                      <input type='text' placeholder='Contraseña'/>
                  </div>
                  <div className="input" >
                      <input type='password' placeholder='Confirmar Contraseña'/>
                  </div>
              </div>
              <div className="submit-container">
                  <div className="submit">Registrarse</div>
              </div>
          </div>
      </div>
    );
  }
  
  export default SignUp;