import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./css/reservas.css";
import { useCookies } from 'react-cookie';

export default function ReserveConsultation() {
    const { examType } = useParams();
    const [medicos, setMedicos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState('');
    const [posibleDiagnostico, setPosibleDiagnostico] = useState('');
    const [hora, setHora] = useState('');
    const [cookies] = useCookies(['rut', 'token', 'email', 'user_type']);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/personal/medicos', {
            headers: {
                'x-auth-token': cookies.token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            setMedicos(data);
        })
        .catch(error => {
            console.error('Error al obtener la lista de médicos:', error);
        });
    }, [cookies]);

    const handleSubmit = () => {
        fetch('http://localhost:8080/api/consultas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': cookies.token
            },
            body: JSON.stringify({
                rut_paciente: cookies.rut,
                rut_medico: medicoSeleccionado,
                tipo_examen: examType,
                posible_diagnostico: posibleDiagnostico,
                hora: hora,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.consulta) {
                alert('Consulta reservada exitosamente');
                navigate('/');
            } else {
                alert('Error al reservar la consulta');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="reserve-consultation">
            <h1>Reservar {examType}</h1>
            <div className="input-box">
                <select value={medicoSeleccionado} onChange={(e) => setMedicoSeleccionado(e.target.value)} required>
                    <option value="">Seleccione un médico</option>
                    {medicos.map(medico => (
                        <option key={medico._id} value={medico.rut}>{medico.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="input-box">
                <input value={posibleDiagnostico} onChange={(e) => setPosibleDiagnostico(e.target.value)} type="text" placeholder="Posible Diagnóstico" required />
            </div>
            <div className="input-box">
                <input value={hora} onChange={(e) => setHora(e.target.value)} type="datetime-local" placeholder="Hora" required />
            </div>
            <div className="input-submit">
                <button onClick={handleSubmit}>Reservar</button>
            </div>
        </div>
    );
}