const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config(); // Cargar las variables de entorno desde .env

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors({origin: true, credentials: true}));

// Middleware para manejar JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Middleware de registro de solicitudes HTTP
app.use(morgan('dev'));

// Importar rutas
const itemRoutes = require('./routes/itemRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const personalRoutes = require('./routes/personalRoutes');
const authRoutes = require('./routes/authRoutes');
const consultaRoutes = require('./routes/consultaRoutes');

// Usar rutas
app.use('/api/items', itemRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/consultas', consultaRoutes);

// Ruta base
app.get('/', (req, res) => res.send('API is running...'));

// Escuchar en el puerto definido
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));