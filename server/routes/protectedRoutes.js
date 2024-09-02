const express = require('express');
const { authenticateJWT } = require('../middlewares/authMiddleware'); // Importa el middleware de autenticación

const router = express.Router();

// Ruta protegida - Solo accesible con un token JWT válido
router.get('/protected', authenticateJWT, (req, res) => {
  // Aquí tienes acceso a req.user, que contiene la información del usuario decodificada del token
  res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user });
});

module.exports = router;