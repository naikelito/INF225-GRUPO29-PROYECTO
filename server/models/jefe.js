const mongoose = require("mongoose")

const jefeunidadSchema = new mongoose.Schema({
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

const jefeunidadModel = mongoose.model("jefeunidads",jefeunidadSchema);
module.exports = jefeunidadModel;
