const express = require('express');
const router = express.Router();
const { getPacientes, createPaciente, updatePaciente, deletePaciente } = require('../controllers/pacienteController.js');

// Obtener todos los pacientes
router.get('/', getPacientes);

// Crear un nuevo paciente
router.post('/', createPaciente);

// Actualizar un paciente existente
router.put('/:id', updatePaciente);

// Eliminar un paciente
router.delete('/:id', deletePaciente);

module.exports = router;
