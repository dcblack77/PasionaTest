const express = require("express");
const app = express();

const { verifyToken } = require('../middlewares/Auth'); 

const { MigrateUsers, GetUsers, GetUser, LoginUser } = require("../controllers/UserController");

app.get("/migrate", MigrateUsers);
app.get("/clients", [ verifyToken ], GetUsers);
app.get("/clients/:id", [ verifyToken ], GetUser);
app.get("/login", LoginUser)

module.exports = app;