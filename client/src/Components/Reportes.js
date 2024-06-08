import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Reportes = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['id_usuario']);
    const [reporte, setReporte] = useState('');

    // Función para manejar el cambio en el cuadro de texto del reporte
    const handleReporteChange = (event) => {
        setReporte(event.target.value);
    };

    // Función para manejar el envío del reporte
    const handleSubmit = () => {
        // Aquí puedes implementar la lógica para subir el reporte, por ejemplo, enviarlo al servidor
        //console.log('Reporte enviado:', reporte);
        // Limpia el cuadro de texto después de enviar el reporte
        //setReporte('');
        alert("reporte enviado");
    };

    // Renderizar la página de reportes
    return (
        <div>
            <h1>Reportes</h1>
            <textarea
                value={reporte}
                onChange={handleReporteChange}
                placeholder="Escribe tu reporte aquí..."
                rows={10}
                cols={50}
            />
            <br />
            <button onClick={handleSubmit}>Subir Reporte</button>
        </div>
    );
};

export default Reportes;
