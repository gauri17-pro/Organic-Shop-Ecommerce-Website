const Sequelize = require('sequelize');

const sequelize = require('../util/dbconfig');


const Shipping = sequelize.define('Shipping', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    Address1: {
        type: Sequelize.STRING,
    },
    Address2: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    }
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false
})

module.exports = Shipping;