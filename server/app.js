require("./config");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const bodyParser = require("body-parser");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

//Habilitar folder Public
app.use(express.static(path.resolve(__dirname, "../public")));

//Configuración Global de rutas
app.use(require("./routes"));

mongoose.connect(process.env.urlDB, (err, res) => {
    if (err) throw err;
    console.log("Base de datos conectada");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el servidor en el puerto ${process.env.PORT}`);
});