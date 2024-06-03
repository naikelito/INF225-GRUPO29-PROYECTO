const mongoose = require("mongoose")

const secretariaSchema = new mongoose.Schema({
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

const secretariaModel = mongoose.model("secretarias",secretariaSchema);
module.exports = secretariaModel;
