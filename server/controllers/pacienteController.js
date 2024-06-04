const Paciente = require('../models/paciente.js');
const bcrypt = require('bcryptjs');

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

//registro paciente
exports.signup = async (req, res) => {
    const { nombre, rut, email, telefono, password, alergias, nacimiento, fonasa, direccion } = req.body;

    try {
        let paciente = await Paciente.findOne({ email });
        if (paciente) {
            return res.status(400).json({ msg: 'El paciente ya existe' });
        }

        paciente = new Paciente({
            nombre,
            rut,
            email,
            telefono,
            password,
            alergias,
            nacimiento,
            fonasa,
            direccion,
        });

        const salt = await bcrypt.genSalt(10);
        paciente.password = await bcrypt.hash(password, salt);

        await paciente.save();

        res.json({ msg: 'Paciente registrado exitosamente' });
    } catch (err) {
        console.error('Error en el registro:', err.message);
        res.status(500).send('Error del servidor');
    }
};
