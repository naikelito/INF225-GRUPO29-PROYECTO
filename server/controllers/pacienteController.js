const Paciente = require('../models/paciente.js');

// Obtener todos los pacientes
exports.getPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.find();
        res.json(pacientes);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Crear un nuevo paciente
exports.createPaciente = async (req, res) => {
    const { nombre, rut, email, telefono, password, alergias, nacimiento, fonasa, direccion, posible_diagnostico } = req.body;
    try {
        const newPaciente = new Paciente({ nombre, rut, email, telefono, password, alergias, nacimiento, fonasa, direccion, posible_diagnostico });
        const paciente = await newPaciente.save();
        res.json(paciente);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Actualizar un paciente existente
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, rut, email, telefono, password, alergias, nacimiento, fonasa, direccion, posible_diagnostico } = req.body;
    try {
        const updatedPaciente = await Paciente.findByIdAndUpdate(id, { nombre, rut, email, telefono, password, alergias, nacimiento, fonasa, direccion, posible_diagnostico }, { new: true });
        res.json(updatedPaciente);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Eliminar un paciente
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    try {
        await Paciente.findByIdAndDelete(id);
        res.json({ msg: 'Paciente eliminado' });
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};
