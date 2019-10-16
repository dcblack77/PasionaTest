const {MigratePolices, GetPolicies} = require('../controllers/PolicesController')
const express = require('express')
const app = express()

app.get('/policies/migrate', MigratePolices )
app.get('/policies', GetPolicies)


module.exports =  app;