const {DataTypes} = require('sequelize');
const {db} = require('../database/connection.js');
const PassVault = db.define('PassVault', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'PassVault',
    timestamps: false,
});

module.exports = PassVault;