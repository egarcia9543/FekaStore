const logger = require("morgan")
const dotenv = require("dotenv");
dotenv.config();

const path = require('path')

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));  //Usar express.json
app.use(express.json());

const PORT = process.env.PORT;
const ruta = require('./routes/routes')

app.listen(PORT, () => {
    console.log(`Servidor en línea puerto ${PORT}`);
})

app.use('/store/v1/', ruta)
app.use(logger("dev"));
