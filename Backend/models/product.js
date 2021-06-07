
const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');

const Product = sequelize.define('Products', {
    product_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: true
    }
})

module.exports = Product;