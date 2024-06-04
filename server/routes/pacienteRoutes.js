const express = require('express');
const router = express.Router();
const { getPacientes, createPaciente, updatePaciente, deletePaciente } = require('../controllers/pacienteController.js');
const pacienteController = require('../controllers/pacienteController');
const auth = require('../middleware/auth');

// Obtener todos los pacientes
router.get('/', getPacientes);

// Crear un nuevo paciente
router.post('/', createPaciente);

// Actualizar un paciente existente
router.put('/:id', updatePaciente);

// Eliminar un paciente
router.delete('/:id', deletePaciente);

router.post('/signup', pacienteController.signup);

module.exports = router;
