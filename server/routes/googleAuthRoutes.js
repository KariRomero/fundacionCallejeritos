const express = require('express');
const passport = require('passport');
const router = express.Router();
require('dotenv').config();

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Ruta de callback para Google después de la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:5173'); // Cambia esto según tus necesidades
  }
);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
//ruta para obtener la autenticacion del ususario
router.get('/current_user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: 'User not authenticated' });
  }
});
module.exports = router;