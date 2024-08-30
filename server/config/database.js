// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   logging: false,
// });


const sequelize = new Sequelize(
  process.env.DB_DEPLOY,
  { logging: false, native: false }
);
module.exports = sequelize;