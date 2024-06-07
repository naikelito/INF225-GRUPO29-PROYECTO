const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
    rut_paciente: {
        type: String,
        required: true,
    },
    rut_medico: {
        type: String,
        required: true,
    },
    tipo_examen: {
        type: String,
        required: true,
    },
    posible_diagnostico: {
        type: String,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
});

const consultaModel = mongoose.model("consultas", consultaSchema);
module.exports = consultaModel;
