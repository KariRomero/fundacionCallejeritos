const express = require('express');
const router = express.Router();
const { googleLoginHandler, getCurrentUserHandler, logoutHandler } = require('../handlers/googleAuthHandlers');

// Rutas para autenticación
router.post('/google-login', googleLoginHandler);  // Ruta para iniciar sesión con Google
router.get('/current-user', getCurrentUserHandler);  // Ruta para obtener el usuario actual
router.post('/logout', logoutHandler);  // Ruta para cerrar sesión

module.exports = router;