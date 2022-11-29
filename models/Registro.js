const Sequilize = require('sequelize');

const sequelize = require("../util/database");

const Usuario = sequelize.define("usuarios",{
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: Sequilize.STRING,
        allowNull: false
    },
    foto:{
        type: Sequilize.STRING,
        allowNull: false
    },
    region:{
        type: Sequilize.STRING,
        allowNull: false
    },
    primario:{
        type: Sequilize.STRING,
        allowNull: false
    }

})

module.exports = Usuario;