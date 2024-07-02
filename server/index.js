// index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database'); // Importar la configuración de Sequelize
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev'));
app.use(cors());

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
