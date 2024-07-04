const express = require('express');
const router = express.Router();

// Importar rutas específicas
const userRoutes = require('./userRoutes');
// Puedes importar otras rutas aquí si las tienes

// Montar rutas
router.use('/users', userRoutes);
// Puedes montar otras rutas aquí si las tienes

module.exports = router;
