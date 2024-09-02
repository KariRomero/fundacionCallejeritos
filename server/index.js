const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session'); // Importa express-session
require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes/indexRoutes');
const passport = require('./config/passport');
const authRoutes = require('./routes/googleAuthRoutes');
const mercadoPagoRouter = require('./mercadoPago/mercadoPagoRoutes');
const User = require('./models/User');
const Adopciones = require('./models/Adopciones');
const protectedRoutes = require('./routes/protectedRoutes'); // Importar rutas protegidas

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS para permitir múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'https://fundacion-callejeritos.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Configuración de express-session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',  // Cambia esto a un secreto seguro
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Usa cookies seguras en producción
    httpOnly: true,  // Cookies no accesibles a JavaScript del cliente
    maxAge: 24 * 60 * 60 * 1000  // 1 día
  }
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session()); // Añadir soporte de sesión para Passport

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

// Rutas
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/pagos', mercadoPagoRouter);
app.use('/protc', protectedRoutes); // Rutas protegidas

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Manejo de errores de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});