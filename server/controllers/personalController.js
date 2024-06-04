const Personal = require('../models/Personal');

// Obtener todo el personal
exports.getPersonal = async (req, res) => {
    try {
        const personal = await Personal.find();
        res.json(personal);
    } catch (err) {
        console.error('Error al obtener el personal:', err.message);
        res.status(500).send('Error del servidor');
    }
};

// Crear un nuevo miembro del personal
exports.createPersonal = async (req, res) => {
    const { nombre, rut, email, telefono, password, cargo } = req.body;
    try {
        const newPersonal = new Personal({ nombre, rut, email, telefono, password, cargo });
        const personal = await newPersonal.save();
        res.json(personal);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Actualizar un miembro del personal existente
exports.updatePersonal = async (req, res) => {
    const { id } = req.params;
    const { nombre, rut, email, telefono, password, cargo } = req.body;
    try {
        const updatedPersonal = await Personal.findByIdAndUpdate(id, { nombre, rut, email, telefono, password, cargo }, { new: true });
        res.json(updatedPersonal);
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};

// Eliminar un miembro del personal
exports.deletePersonal = async (req, res) => {
    const { id } = req.params;
    try {
        await Personal.findByIdAndDelete(id);
        res.json({ msg: 'Personal eliminado' });
    } catch (err) {
        res.status(500).send('Error del servidor');
    }
};
