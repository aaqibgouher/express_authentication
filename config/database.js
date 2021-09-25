const express = require('express');
const { Sequelize } = require('sequelize');


// Option 1: Passing a connection URI
const db = new Sequelize('express_auth', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;