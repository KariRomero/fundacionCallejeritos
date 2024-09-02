const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV === 'production' ? 'https://fundacion-callejeritos.vercel.app' : 'http://localhost:5173';

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google para manejar la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => {
    // Generar JWT después de la autenticación exitosa
    const { user } = req.user; // Extraer usuario de req.user
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Enviar el token JWT al cliente como JSON
    res.json({ token });
  }
);

// Ruta para obtener la autenticación del usuario actual usando JWT
router.get('/current_user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    res.json({ user: decoded });
  });
});

// Ruta para cerrar sesión - No se necesita con JWT, ya que la sesión no se almacena en el servidor
router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;