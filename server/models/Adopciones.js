const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Adopciones = sequelize.define('Adopciones', {
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
    type: DataTypes.ENUM('macho', 'hembra'),
    allowNull: false,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialCare: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  getsAlongWithDogs: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  getsAlongWithCats: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  getsAlongWithChildren: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: true,
  },
  userId: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
  },
});

module.exports = Adopciones;
