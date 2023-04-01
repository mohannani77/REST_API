const express = require('express')
const app = express()
const User=require('./models/user')
const bodyParser = require("body-parser");
const register = require('./Routes/register')
const login=require('./Routes/login')


app.use(express.urlencoded());
require("dotenv").config()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/",register)
app.use('/',login)



module.exports = app;