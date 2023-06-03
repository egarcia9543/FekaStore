const logger = require("morgan")
const dotenv = require("dotenv");
dotenv.config();

const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));  //Usar express.json
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 6666;
const ruta = require('./routes/routes')

app.listen(PORT, () => {
    console.log(`Servidor en línea puerto ${PORT}`);
})

app.use('/store/v1/', ruta)
app.use(logger("dev"));
