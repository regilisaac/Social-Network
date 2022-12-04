const Sequilize = require('sequelize');

const sequelize = require("../util/database");

const Publication = sequelize.define("Publicaciones",{
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    description:{
        type: Sequilize.STRING,
        allowNull: false
    },
    imgPublication:{
        type: Sequilize.STRING,
        allowNull: true
    }


})

module.exports = Publication;