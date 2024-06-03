const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');

const itemRoutes = require('./routes/itemRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const personalRoutes = require('./routes/personalRoutes');

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para manejar JSON
app.use(express.json());

// Middleware de registro de solicitudes HTTP
app.use(morgan('dev'));

// Usar rutas
app.use('/api/items', itemRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/personal', personalRoutes);

// Rutas
app.get('/', (req, res) => res.send('API is running...'));

// Escuchar en el puerto definido
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));