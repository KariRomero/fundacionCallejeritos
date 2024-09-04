const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const routes = require('./routes/indexRoutes');
const authRoutes = require('./routes/authRoutes');  
const mercadoPagoRouter = require('./mercadoPago/mercadoPagoRoutes');
const User = require('./models/User');
const Adopciones = require('./models/Adopciones');


const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS para permitir solo orígenes específicos
const allowedOrigins = [
  'http://localhost:5173',
  'https://fundacion-callejeritos.vercel.app',
  'https://fundacioncallejeritos-production.up.railway.app'
];
// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (por ejemplo, Postman o curl)
    if (!origin) return callback(null, true);
    
    // Si el origen está en la lista de permitidos, permitir la solicitud
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('El CORS policy no permite el acceso desde el origen especificado.'));
    }
  },
  credentials: true,  // Habilita el envío de credenciales (cookies, cabeceras de autorización, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],  // Cabeceras permitidas
}));
 



// Rutas
app.use('/api', routes);
app.use('/autorizar', authRoutes);  
app.use('/pagos', mercadoPagoRouter);



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

// Prueba la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter:true });
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});