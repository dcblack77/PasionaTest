require("./config");
require('./config/db');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const api = require("./routes");

const bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//Habilitar folder Public
app.use(express.static(path.resolve(__dirname, "../public")));

//Configuración Global de rutas
app.use(require("./routes"));

async function main() {
    await app.listen(process.env.PORT);
    console.log('Server on port', process.env.PORT);
}

main();