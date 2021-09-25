const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        defaultValue: null,
        allowNull: true
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: null
    },
    is_verified: {
        type: DataTypes.ENUM('1', '0'),
        defaultValue: '0'
    },
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at', 
    },
    updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
    },
    last_login_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
    }

});

module.exports = User;