const express = require('express');
const router = express.Router();

// Importar rutas específicas
const userRoutes = require('./userRoutes');
const adopcionesRoutes = require('./adopcionesRoutes')
const casosRoutes = require('./casosRoutes')
// Puedes importar otras rutas aquí si las tienes

// Montar rutas
router.use('/users', userRoutes);
router.use('/adopciones',adopcionesRoutes);
router.use('/casos', casosRoutes)


module.exports = router;
