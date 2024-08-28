const express = require('express');
const router = express.Router();
const adoptarHandler = require('../handlers/adoptarHandler'); // Asegúrate de que la ruta sea correcta

// Ruta para adoptar una mascota
router.post("/", adoptarHandler);

module.exports = router;