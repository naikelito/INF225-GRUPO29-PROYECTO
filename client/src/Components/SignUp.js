import React, { useState } from 'react';
import "./css/signup.css";
import { useCookies } from 'react-cookie';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { BrowserRouter as Router, Route, Switch, Link, Routes, useNavigate  } from 'react-router-dom';

export default function SignUp() {


    const [selectedDate, setSelectedDate] = useState(null);

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


    const handleDateChange = (date) => {
        setSelectedDate(date);
      };


    const Pressed = () => {
        // Aquí defines la acción que deseas ejecutar
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
                      // Maneja los datos recibidos
                      setCookie('user_type',data.userType , { path: '/' , sameSite: 'none', secure: true});
                      console.log(data);

                    })
                    .catch(error => {
                      // Maneja cualquier error
                      console.error('Error:', error);
                    });

        }else{
            alert("No pueden quedar casillas en blanco. Vuelva a introducir los datos nuevamente");
        }


    };
  




  return (
    
    <div>

     <header class="xd">
        <nav class="navegation">
            <a href="#">Inicio</a>
            <a href="#">Contacto</a>
            <a href="#">{cookies.user_type}</a>

        </nav>
    </header>
    <div className="login-box">
        <div class="login-header">
            <header>Login</header>
        </div>
        <div class="input-box"><input value={Text} onChange={handlepassword} type="text" class="input-field" placeholder="Nombre Completo" autocomplete="off" required/> </div>
        <div class="input-box"><input value={Text} onChange={handlepassword} type="text" class="input-field" placeholder="Rut" autocomplete="off" required/> </div>      
        <div class="input-box">
            <input value={email} onChange={handleEmail} type="text" class="input-field" placeholder="Email" autocomplete="off" required/>
        </div>
        <div class="input-box"><input value={Number} onChange={handlepassword} type="text" class="input-field" placeholder="Rut" autocomplete="off" required/> </div>
        <div class="input-box"><input value={password} onChange={handlepassword} type="text" class="input-field" placeholder="Contraseña" autocomplete="off" required/> </div>
        <div class="input-box"><input value={Text} onChange={handlepassword} type="text" class="input-field" placeholder="Alergias" autocomplete="off" required/> </div>
        <div class="input-box"><input value={Text} onChange={handlepassword} type="text" class="input-field" placeholder="Rut" autocomplete="off" required/> </div>
        <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Selecciona una fecha"
        />
        <div class="input-box"><input value={Text} onChange={handlepassword} type="text" class="input-field" placeholder="Foanasa: " autocomplete="off" required/> </div>
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
            No tienes cuenta ? <a href="#">Registrarse</a>
        </p></div>
    </div>
    </div>
  )
}
