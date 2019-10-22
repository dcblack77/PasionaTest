const {MigratePolices, GetPolicies, GetPolicie} = require('../controllers/PolicesController')
const { verifyToken, verifyAdmin } = require('../middlewares/Auth'); 
const express = require('express')
const app = express()

app.get('/policies/migrate', MigratePolices )
app.get('/policies', [ verifyToken, verifyAdmin ], GetPolicies)
app.get('/policies/:param', [ verifyToken, verifyAdmin ], GetPolicie )


module.exports =  app;