const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const auth = require('../middleware/auth'); // Asegúrate de tener el middleware de autenticación

// Crear una nueva consulta
router.post('/', auth, consultaController.createConsulta);

// Obtener todas las consultas
router.get('/', auth, consultaController.getConsultas);

// Obtener una consulta por ID
router.get('/:id', auth, consultaController.getConsultaById);

// Actualizar una consulta por ID
router.put('/:id', auth, consultaController.updateConsulta);

// Eliminar una consulta por ID
router.delete('/:id', auth, consultaController.deleteConsulta);

module.exports = router;
