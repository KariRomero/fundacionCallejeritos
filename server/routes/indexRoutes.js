const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const adopcionesRoutes = require('./adopcionesRoutes');
const casosRoutes = require('./casosRoutes');
const adoptarRoutes = require('./adoptarRoutes');

router.use('/users', userRoutes);
router.use('/adopciones', adopcionesRoutes);
router.use('/casos', casosRoutes);
router.use('/adoptar', adoptarRoutes);

module.exports = router;