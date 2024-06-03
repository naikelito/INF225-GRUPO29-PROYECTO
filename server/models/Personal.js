const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    rut: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cargo: {
        type: String,
        required: true, // Puede ser medico, tens, secretaria o jefe
    },
});

const Personal = mongoose.model('Personal', personalSchema);
module.exports = Personal;
