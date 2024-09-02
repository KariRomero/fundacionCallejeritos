// routes/authRoutes.js
const { Router } = require('express');
const { googleLoginHandler, getCurrentUserHandler, logoutHandler } = require('../handlers/googleAuthHandlers');

const router = Router();

// Rutas para autenticación
router.post('/google-login', googleLoginHandler);  // Ruta para iniciar sesión con Google
router.get('/current_user', getCurrentUserHandler);  // Ruta para obtener el usuario actual
router.post('/logout', logoutHandler);  // Ruta para cerrar sesión

module.exports = router;