const express = require('express')
const mongoose = require('mongoose');
const cors = require("cors")
const morgan = require('morgan');
require("dotenv").config();


const app = express();

mongoose
.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log("DB CONNECTION ERROR", err));


app.use(morgan("dev"));
app.use(cors({origin:true,credentials:true}));


const testRoutes = require("./routes/test");
app.use("/",testRoutes);


const port = process.env.PORT || 8080;

const server = app.listen(port,()=> 
    console.log('server is running on port 8080')
);