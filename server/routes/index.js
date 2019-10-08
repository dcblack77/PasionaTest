const express = require("express");
const app = express();

app.use(require("./UserRoutes"));
//app.use(require("./login"));

module.exports = app;