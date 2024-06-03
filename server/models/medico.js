const mongoose = require("mongoose")

const medicoSchema = new mongoose.Schema({
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
    }
})

const medicoModel = mongoose.model("medicos",medicoSchema);
module.exports = medicoModel;
