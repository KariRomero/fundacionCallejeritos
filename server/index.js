const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes/indexRoutes');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/googleAuthRoutes');
const mercadoPagoRouter = require('./mercadoPago/mercadoPagoRoutes');
const User = require('./models/User');  // Asegúrate de que las rutas sean correctas
const Adopciones = require('./models/Adopciones');

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS para permitir múltiples orígenes
const corsOptions = {
  origin: ['http://localhost:5173', 'https://fundacion-callejeritos.vercel.app'],
  credentials: true,  // Permitir el envío de cookies y encabezados de autorización
};
app.use(cors(corsOptions));  // Configurar CORS con múltiples orígenes permitidos

// Define las relaciones de muchos a muchos
User.belongsToMany(Adopciones, {
  through: 'UserXAdopciones',
  as: 'adopciones',
  foreignKey: 'userId',
  otherKey: 'adopcionId'
});

Adopciones.belongsToMany(User, {
  through: 'UserXAdopciones',
  as: 'usuarios',
  foreignKey: 'adopcionId',
  otherKey: 'userId'
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // Cambia a `true` en producción (HTTPS)
    sameSite: 'none',  // Necesario para permitir cookies entre sitios
  }
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Manejar solicitudes OPTIONS (preflight)
app.options('*', cors(corsOptions));

// Rutas
app.use('/api', routes);
app.use('/', authRoutes); // Asegúrate de que las rutas de autenticación se cargan bajo '/auth'
app.use('/pagos', mercadoPagoRouter);

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    // Sincroniza los modelos con la base de datos
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});