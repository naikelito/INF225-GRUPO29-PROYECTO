const Consulta = require('../models/consulta');

// Crear una nueva consulta
exports.createConsulta = async (req, res) => {
    const { rut_paciente, rut_medico, tipo_examen, posible_diagnostico, hora } = req.body;

    try {
        const newConsulta = new Consulta({
            rut_paciente,
            rut_medico,
            tipo_examen,
            posible_diagnostico,
            hora
        });

        await newConsulta.save();
        res.status(201).json({ msg: 'Consulta creada exitosamente', consulta: newConsulta });
    } catch (err) {
        console.error('Error al crear la consulta:', err.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener todas las consultas
exports.getConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.status(200).json(consultas);
    } catch (err) {
        console.error('Error al obtener las consultas:', err.message);
        res.status(500).send('Error del servidor');
    }
};

// Obtener una consulta por ID
exports.getConsultaById = async (req, res) => {
    try {
        const consulta = await Consulta.findById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ msg: 'Consulta no encontrada' });
        }
        res.status(200).json(consulta);
    } catch (err) {
        console.error('Error al obtener la consulta:', err.message);
        res.status(500).send('Error del servidor');
    }
};

// Actualizar una consulta por ID
exports.updateConsulta = async (req, res) => {
    const { rut_paciente, rut_medico, tipo_examen, posible_diagnostico, hora } = req.body;

    try {
        const consulta = await Consulta.findById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ msg: 'Consulta no encontrada' });
        }

        consulta.rut_paciente = rut_paciente || consulta.rut_paciente;
        consulta.rut_medico = rut_medico || consulta.rut_medico;
        consulta.tipo_examen = tipo_examen || consulta.tipo_examen;
        consulta.posible_diagnostico = posible_diagnostico || consulta.posible_diagnostico;
        consulta.hora = hora || consulta.hora;

        await consulta.save();
        res.status(200).json({ msg: 'Consulta actualizada exitosamente', consulta });
    } catch (err) {
        console.error('Error al actualizar la consulta:', err.message);
        res.status(500).send('Error del servidor');
    }
};

// Eliminar una consulta por ID
exports.deleteConsulta = async (req, res) => {
    try {
        const consulta = await Consulta.findById(req.params.id);
        if (!consulta) {
            return res.status(404).json({ msg: 'Consulta no encontrada' });
        }

        await consulta.remove();
        res.status(200).json({ msg: 'Consulta eliminada exitosamente' });
    } catch (err) {
        console.error('Error al eliminar la consulta:', err.message);
        res.status(500).send('Error del servidor');
    }
};
