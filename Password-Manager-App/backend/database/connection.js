const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const db = new Sequelize({
    dialect: 'sqlite',    
    storage: path.join(__dirname, 'password-manager.db'), 
    logging: false, 
});

db.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });


module.exports= {
    db,
    Sequelize,
    DataTypes,
}