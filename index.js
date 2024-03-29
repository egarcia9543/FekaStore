/* eslint-disable no-undef */
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const cors = require("cors");

const express = require("express");
const ruta = require("./src/routes/routes");
const cookieParser = require("cookie-parser");
const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));
app.use(express.static(path.join(__dirname, "/src/public")));


app.use(express.urlencoded({extended: true})); // Usar express.json
app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/", ruta);
app.use(logger("dev"));


const PORT = process.env.PORT || 6666;


app.listen(PORT, () => {
  console.log(`Servidor en línea puerto ${PORT}`);
});

