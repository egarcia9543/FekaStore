const logger = require("morgan")
const dotenv = require("dotenv");
dotenv.config();

const path = require('path')
const cors = require('cors')

const express = require('express');
const ruta = require('./routes/routes')
const app = express();

//const session = require('express-session')
//const cookieParser = require('cookie-parser')


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.use(express.urlencoded({ extended: true }));  //Usar express.json
app.use(express.json());
app.use(cors());

// app.use(cookieParser());
app.use('/store/v1/', ruta)
app.use(logger("dev"));



const PORT = process.env.PORT || 6666;


app.listen(PORT, () => {
    console.log(`Servidor en línea puerto ${PORT}`);
})

