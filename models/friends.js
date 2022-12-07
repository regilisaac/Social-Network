const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Friends = sequelize.define("friends",{
  id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
  },
  usuarioID:{
      type: Sequelize.INTEGER,
      allowNull: false,
  },
  amigoID:{
      type: Sequelize.INTEGER,
      allowNull: false,
  }

})

module.exports = Friends;