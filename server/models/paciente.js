const mongoose = require("mongoose")

const pacienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required:true,
    },
    rut:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    telefono:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    alergias:{
        type:Array
    },
    nacimiento:{
        type:String,
        require:true,
    },
    fonasa:{
        type:String,
        require:true,
    },
    direccion:{
        type:String,
        require:true,
    },
    posible_diagnostico:{
        type:String,
        require:true,
    },
})

const pacienteModel = mongoose.model("pacientes",pacienteSchema);
module.exports = pacienteModel;