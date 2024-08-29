const express = require('express');
const router = express.Router();
const {adoptarHandler, deleteAdoptarHandler} = require('../handlers/adoptarHandler'); // Asegúrate de que la ruta sea correcta

// Ruta para adoptar una mascota
router.post("/", adoptarHandler);
router.delete("/delete", deleteAdoptarHandler)

module.exports = router;