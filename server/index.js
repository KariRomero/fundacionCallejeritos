const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); // Asegúrate de tener body-parser instalado
require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes/indexRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json()); // Parsea el body de las solicitudes a JSON

// Rutas
app.use('/api', routes);

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ force: false }); // Usa `force: true` solo en desarrollo para recrear las tablas
  })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
