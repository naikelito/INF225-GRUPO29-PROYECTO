import React, { useState } from 'react';
import "./css/history.css";
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch, Link, Routes, useNavigate  } from 'react-router-dom';

export default function History() {

    const [cookies, setCookie] = useCookies(['id_usuario','user_type', 'token']);
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState([]); // Estado para almacenar los datos del historial

    const Go_to_Login = () => {
        navigate("/Login");
    };

    const Go_to_History = () => {
        navigate("/History");
    };

    const Pressed = () => {
        // Aquí defines la acción que deseas ejecutar
        setCookie('user_type', "");
    };

    const fetchHistory = () => {
        fetch("http://localhost:8080/api/consultas/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-auth-token": cookies.token,
                "Cache-Control": "no-cache"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data !== undefined) {
                // Almacenar los datos del historial en el estado
                setHistoryData(data);
            } else {
                alert('Error al recibir los datos: ' + data.msg);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <header className="xd">
                <nav className="navegation">
                    <a href="/">Inicio</a>
                    <a href="#">Contacto</a>
                    <a>{cookies.user_type}</a>
                    {cookies.user_type !== "" ? (
                        <a className='Button' onClick={Pressed}>Salir de sesión</a>
                    ) : (
                        <a onClick={Go_to_Login}>Iniciar Sesión</a>
                    )}
                    <a onClick={Go_to_History}>Revisar historial de citas</a>
                </nav>
            </header>
            <button onClick={fetchHistory} className="submit-btn">Solicitar historial</button>
                {historyData.map(obj => (
                    <div key={obj.id} className="info-container">
                        <p>Rut Paciente: {obj.rut_paciente}</p>
                        <p>Rut Medico: {obj.rut_medico}</p>
                        <p>Tipo Examen: {obj.tipo_examen}</p>
                        <p>Posible Diagnostico: {obj.posible_diagnostico}</p>
                        <p>Hora: {obj.hora}</p>
                        {/* Agrega aquí el resto de los datos que deseas mostrar */}
                    </div>
                ))}

        </div>
    );
}
