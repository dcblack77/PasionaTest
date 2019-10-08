const express = require("express");
const app = express();

const { MigrateUsers, GetUsers, GetUser } = require("../controllers/UserController");

app.get("/migrate", MigrateUsers);
app.get("/clients", GetUsers);
app.get("/clients/:id", GetUser);

module.exports = app;