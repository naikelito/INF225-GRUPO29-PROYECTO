const express = require('express');
const router = express.Router();
const { getPersonal, createPersonal, updatePersonal, deletePersonal } = require('../controllers/personalController');

// Obtener todo el personal
router.get('/', getPersonal);

// Crear un nuevo miembro del personal
router.post('/', createPersonal);

// Actualizar un miembro del personal existente
router.put('/:id', updatePersonal);

// Eliminar un miembro del personal
router.delete('/:id', deletePersonal);

module.exports = router;
