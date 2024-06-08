import React, { useState } from 'react';
import "./css/signupper.css";
import { useCookies } from 'react-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

export default function SignUpPers() {


    const [selectedDate, setSelectedDate] = useState(null);
    const [cookies, setCookie] = useCookies(['id_usuario','user_type']);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [rut, setRut] = useState('');
    const [allergies, setAllergies] = useState('');
    const [fonasa, setFonasa] = useState('');
    const [telefono, setTelefono] = useState(''); // Nuevo campo para el teléfono
    const [direccion, setDireccion] = useState(''); // Nuevo campo para la dirección
    const [cargo, setCargo] = useState('');
    const navigate = useNavigate();

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleRut = (event) => {
        setRut(event.target.value);
    };

    const handleAllergies = (event) => {
        setAllergies(event.target.value);
    };

    const handleFonasa = (event) => {
        setFonasa(event.target.value);
    };

    const handleTelefono = (event) => {
        setTelefono(event.target.value);
    };

    const handleDireccion = (event) => {
        setDireccion(event.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCargo = (event) => {
        setCargo(event.target.value);
    };
  

    const handleSubmit = () => {
        if(email !== "" && password !== "" && fullName !== "" && rut !== "" && telefono !== "" && cargo !== "") {   
            fetch('http://localhost:8080/api/personal/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: fullName,
                    rut: rut,
                    email: email,
                    telefono: telefono,
                    password: password,
                    cargo: cargo
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.msg === 'Usuario registrado exitosamente') {
                    alert('Registro exitoso. Ahora puede iniciar sesión.');
                    navigate('/Login'); // Redirige a la página de inicio de sesión (hay q hacer q la ruta al login sea /login xd, por mientras esta de /)
                } else {
                    alert('Error en el registro: ' + data.msg);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert("No pueden quedar casillas en blanco. Vuelva a introducir los datos nuevamente");
        }
    };


    const Pressed = () => {
        setCookie('user_type', "");
        setCookie('token', "");
    };

    const Go_to_Login = () => {
        navigate("/Login");
    };




  return (
    <div>
    <header className="xd">
        <nav className="navegation">
            <a href="/">Inicio</a>
            <a href="#">Contacto</a>
            <a href="#">{cookies.user_type}</a>

            {cookies.user_type != "" ? (
                    <a className='Button' onClick={Pressed} >Salir de sesión</a>
                ) : (
                    <a onClick={Go_to_Login}>Iniciar Sesión</a>
            )}

        </nav>
    </header>
    <div className="login-box">
        <div className="login-header">
            <header>Sign Up</header>
        </div>
        <div className="input-box">
            <input value={fullName} onChange={handleFullName} type="text" className="input-field" placeholder="Nombre Completo" autoComplete="off" required />
        </div>
        <div className="input-box">
            <input value={email} onChange={handleEmail} type="text" className="input-field" placeholder="Email" autoComplete="off" required />
        </div>
        <div className="input-box">
            <input value={rut} onChange={handleRut} type="text" className="input-field" placeholder="Rut" autoComplete="off" required />
        </div>
        <div className="input-box">
            <input value={password} onChange={handlePassword} type="password" className="input-field" placeholder="Contraseña" autoComplete="off" required />
        </div>
        <div className="input-box">
            <input value={telefono} onChange={handleTelefono} type="text" className="input-field" placeholder="Teléfono" autoComplete="off" required />
        </div>

        <div className="input-box">
        <label className="input-box" htmlFor="input-box"> <h1 style={{fontSize: "24px", fontWeight: "Bold"}}> Seleccione su cargo:</h1></label>
        <select className="combo-box" id="combo-box" value={cargo} onChange={handleCargo}>
            <option value="medico">medico</option>
            <option value="jefe">jefe</option>
            <option value="secretaria">secretaria</option>
            <option value="tecnologo">tecnologo</option>
            <option value="tens">tens</option>
        </select>
        </div>

        <div className="input-submit">
            <button onClick={handleSubmit} className="submit-btn" id="submit">Registrar</button>
        </div>
    </div>
</div>
  )
}
