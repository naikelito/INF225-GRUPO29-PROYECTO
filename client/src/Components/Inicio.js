import { BrowserRouter as Router, Route, Switch, Link, Routes, useNavigate  } from 'react-router-dom';
import "./css/iniciosdos.css";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from "leaflet";
import MarkerIcon from "./leaflet/images/marker-icon.png";
import MarkerShadow from "./leaflet/images/marker-shadow.png";
import "./leaflet/leaflet.css";

// Crear el icono personalizado para los marcadores


const customMarkerIcon = new L.Icon({
    iconUrl: MarkerIcon,
    shadowUrl: MarkerShadow,
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
    shadowSize: [41, 41]
});


export default function Inicio() {

    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['id_usuario','user_type']);
    const Pressed = () => {
        setCookie('user_type', "");
    };

    const Go_to_Login = () => {
        navigate("/Login");
    };


    const handleReservation = () => {
        if (cookies.user_type !== "") {
            // Si la sesión está iniciada, redirigir a la página de exámenes
            navigate("/examenes");
        } else {
            // Si la sesión no está iniciada, redirigir a la página de inicio de sesión
            navigate("/Login");
        }
    };


    return (
        <div>
            <header className="xd">
                <nav className="navegation">
                    <a href="/">Inicio</a>
                    <a href="#">Contacto</a>
                    <a>{cookies.user_type}</a>
                    {cookies.user_type != "" ? (
                            <button className='Button' onClick={Pressed} >Salir de sesión</button>
                        ) : (
                            <a onClick={Go_to_Login}>Iniciar Sesión</a>
                        )}

                </nav>
            </header>
            <div className="login-box">
                <div className="login-header">
                {cookies.user_type != "" ? (
                            <header>¡Qué bueno volver a verte!</header>
                        ) : (
                            <header>¡Bienvenido a la clínica Davila!</header>
                        )}
                </div>
                <h1 className="h1">¿Quienes somos?</h1>
                <h2 className="h2">
                    ¡Bienvenidos a la Clínica Dávila! Somos especialistas en imagenología, dedicados a ofrecer diagnósticos precisos mediante técnicas avanzadas como resonancias magnéticas, tomografías computarizadas, ecografías y radiografías. Contamos con un equipo de profesionales altamente capacitados y tecnología de última generación, comprometidos con tu salud y bienestar. Tu diagnóstico en las mejores manos.
                </h2>
                <div className="input-submit">
                    <button onClick={handleReservation} className="submit-btn">Reserva tu hora</button>
                </div>
                <div className="map-info-container">
                    <div className="map-container">
                        <MapContainer style={{ height: "400px", width: "100%" }} center={[-33.51884,-70.59663]} zoom={13} scrollWheelZoom={false}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker icon={customMarkerIcon} position={[-33.51884,-70.59663]} />
                        </MapContainer>
                    </div>
                    <div className="info-container">
                        <h3>Información de la Ubicación</h3>
                        <p><strong>Dirección:</strong> Serafín Zamora 190, 8241479 La Florida, Región Metropolitana</p>
                        <p><strong>Teléfono:</strong> +56222702700</p>
                        <p><strong>Horario:</strong> Abierto todos los días las 24hrs</p>
                        <p><strong>Servicios:</strong> Resonancias Magnéticas, Tomografías, Ecografías, Radiografías</p>
                    </div>
                </div>
            </div>
        </div>
    );
}