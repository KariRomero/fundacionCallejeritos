// googleAuthRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Ruta de redirección al frontend después de la autenticación
const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV === 'production' ? 'https://fundacion-callejeritos.vercel.app' : 'http://localhost:5173';

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google para manejar la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => {
    // Generar JWT después de la autenticación exitosa
    const user = req.user;
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Redirigir al frontend con el token JWT
    res.redirect(`${CLIENT_HOME_PAGE_URL}/?token=${token}`);
  }
);

// Ruta para obtener la autenticación del usuario actual usando JWT
router.get('/current_user', (req, res) => {
  // Extraer el token JWT del encabezado de autorización
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // Aquí puedes usar `decoded` para obtener la información del usuario
    res.json({ user: decoded });
  });
});

// Ruta para cerrar sesión - No se necesita con JWT, ya que la sesión no se almacena en el servidor
router.get('/logout', (req, res) => {
  // No hay lógica de cerrar sesión del servidor ya que estamos usando JWT
  res.json({ message: 'Logout successful' });
});

module.exports = router;