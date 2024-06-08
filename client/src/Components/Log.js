import React, { useState } from 'react';
import "./css/inicio.css";
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch, Link, Routes, useNavigate  } from 'react-router-dom';

export default function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(['id_usuario','user_type']);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const handlepassword = (event)=>{
        setPassword(event.target.value);
    };

    const handleEmail = (event)=>{
        setEmail(event.target.value);
    };
//data.token
    const Go_to_SignUp = () => {


        navigate("/SignUp");

    };
    const Pressed = () => {
        if(email !== "" && password !== ""){   
            fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password,
                }),
              })
                .then(response => response.json())
                .then(data => {
                  if (data.token) {
                      setCookie('token', data.token, { path: '/', sameSite: 'none', secure: true });
                      setCookie('user_type', data.userType, { path: '/', sameSite: 'none', secure: true });
                      setCookie('id_usuario', data.user.id, { path: '/', sameSite: 'none', secure: true });
                      setCookie('rut', data.user.rut, { path: '/', sameSite: 'none', secure: true });
                      setCookie('email', email, { path: '/', sameSite: 'none', secure: true });
                      setCookie('nombre', data.user.nombre, { path: '/', sameSite: 'none', secure: true });
                      // Navega a la página deseada después del login
                      //alert(data.userType);
                    if (data.userType === 'tens') {
                        navigate('/Reportes');
                    } else {
                        navigate('/');
                    }

                  } else {
                      alert("Error en el login. Por favor, revisa tus credenciales.");
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                });
        } else {
            alert("No pueden quedar casillas en blanco. Vuelva a introducir los datos nuevamente");
        }
    };
    
    

      
  return (

    <div>

     <header class="xd">
        <nav class="navegation">
            <a href="/">Inicio</a>
            <a href="#">Contacto</a>
            <a href="#">{cookies.user_type}</a>

        </nav>
    </header>
    <div className="login-box">
        <div class="login-header">
            <header>Login</header>
        </div>
        <div class="input-box">
            <input value={email} onChange={handleEmail} type="text" class="input-field" placeholder="Email" autocomplete="off" required/>
        </div>
        <div class="input-box"><input value={password} onChange={handlepassword} type="text" class="input-field" placeholder="Contraseña" autocomplete="off" required/>
        </div>
        <div class="forgot">
            <section>
                <input type="checkbox" id="check"/>
                <label for="check">Recordarme</label>
            </section>
        </div>
        <div class="input-summit">
            <button onClick={Pressed} class="submit-btn" id="submit">ingresar</button>
        </div>
        <div class="sign-up-link"><p>
            No tienes cuenta ? <button class = "sign-up-link" href="#" onClick={Go_to_SignUp}>Registrarse</button>
        </p></div>
    </div>
    </div>
  )
}
