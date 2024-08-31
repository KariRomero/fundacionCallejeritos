const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');  // Tu instancia de Sequelize
const routes = require('./routes/indexRoutes');
const session = require('express-session');
const passport = require('./config/passport');
const authRoutes = require('./routes/googleAuthRoutes');
const mercadoPagoRouter = require('./mercadoPago/mercadoPagoRoutes');
const User = require('./models/User');
const Adopciones = require('./models/Adopciones');
const pgSession = require('connect-pg-simple')(session);  // Importar connect-pg-simple

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS para permitir múltiples orígenes
const allowedOrigins = ['http://localhost:5173', 'https://fundacion-callejeritos.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));  
// Middleware
app.use(morgan('dev'));
app.use(express.json());  // Utiliza el analizador JSON incorporado en Express

// Configuración de sesión con PostgreSQL
app.use(session({
  store: new pgSession({
    pool: sequelize,  // Utiliza tu pool de conexión de Sequelize
    tableName: 'session'  // Puedes personalizar el nombre de la tabla
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,  // Cambia a `false` para evitar sesiones vacías
  cookie: {
    httpOnly: true,  // La cookie no puede ser accedida por JavaScript del lado del cliente
    secure: process.env.NODE_ENV === 'production',  // Solo envía cookies a través de HTTPS en producción
    sameSite: 'none',  // Necesario para permitir cookies entre sitios (cross-site)
  }
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/', authRoutes);  // Asegúrate de que las rutas de autenticación se cargan bajo '/auth'
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