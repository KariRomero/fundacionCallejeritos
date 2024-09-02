const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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
    // Permitir solicitudes desde orígenes definidos o sin origen (solicitudes de la misma máquina)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
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

// Inicialización de Passport
app.use(passport.initialize());

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

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});