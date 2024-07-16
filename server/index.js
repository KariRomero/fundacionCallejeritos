const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser'); 
require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes/indexRoutes');
const session = require('express-session');
const passport = require('./config/passport'); // Asegúrate de importar passport desde el archivo correcto
const authRoutes = require('./routes/googleAuthRoutes'); // Asegúrate de ajustar la ruta según tu estructura de proyecto

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json()); 

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api', routes);
app.use(authRoutes); // Uso de las rutas de autenticación

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ force: false }); 
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