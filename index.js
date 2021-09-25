const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const app = express();
const db = require('./config/database');
const expressValidator = require('express-validator');

// test the connection
db.authenticate()
    .then(() => console.log("Db connection established.."))
    .catch(err => console.log("error is : "+err))

app.use('/api/auth', require('./routes/api/auth_api'));

const PORT = 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));