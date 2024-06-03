const mongoose = require("mongoose")

const tensSchema = new mongoose.Schema({
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

const tensModel = mongoose.model("TENS",tensSchema);
module.exports = tensModel;
