const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CasosDeRescate = sequelize.define("CasosDeRescate", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("macho", "hembra"),
    allowNull: false,
  },
  age: {
    type: DataTypes.ENUM("cachorro", "adulto", "anciano"),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

module.exports = CasosDeRescate;
