import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/examen.css";

export default function ExamSelection() {
    const navigate = useNavigate();

    const handleSelection = (examType) => {
        navigate(`/reservar/${examType}`);
    };

    return (
        <div className="exam-selection">
            <h1>Seleccione un tipo de examen</h1>
            <div className="exam-buttons">
                <button onClick={() => handleSelection('resonancia')}>Resonancia Magnética</button>
                <button onClick={() => handleSelection('tomografia')}>Tomografía</button>
                <button onClick={() => handleSelection('rayos-x')}>Rayos X</button>
                <button onClick={() => handleSelection('ecografia')}>Ecografía</button>
            </div>
        </div>
    );
}
