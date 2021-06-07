const sequelize = require('../util/dbconfig')
const Sequelize = require('sequelize');

const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    }
});



module.exports = Category;