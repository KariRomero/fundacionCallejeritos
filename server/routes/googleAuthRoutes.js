const express = require('express');
const passport = require('passport');
const router = express.Router();
require('dotenv').config();

// Determina la URL de redirección en función del entorno
const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV === 'production' ? 'https://fundacion-callejeritos.vercel.app' : 'http://localhost:5173';

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback para Google después de la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => {
    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

// Ruta para cerrar sesión
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log('Error en req.logout:', err);
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.log('Error en req.session.destroy:', err);
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      console.log('Sesión destruida y cookie eliminada');
      res.redirect(CLIENT_HOME_PAGE_URL);
    });
  });
});

// Ruta para obtener la autenticación del usuario
router.get('/current_user', (req, res) => {  // Correcto sin el prefijo /auth
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});

module.exports = router;