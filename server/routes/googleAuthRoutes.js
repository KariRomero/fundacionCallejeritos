// googleAuthRoutes.js

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User")
require('dotenv').config();

// Ruta de redirección al frontend después de la autenticación
const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV === 'production' ? 'https://fundacion-callejeritos.vercel.app' : 'http://localhost:5173';

// Ruta para iniciar el proceso de autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google para manejar la autenticación
router.get('/google/callback',
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
// Ruta de callback de Google para manejar la autenticación
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => {
    // Obtener el token JWT y los datos del usuario autenticado
    const { user, token } = req.user;

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

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    try {
      // Busca al usuario en la base de datos utilizando el ID del token decodificado
      const user = await User.findByPk(decoded.id); 

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Devuelve la información completa del usuario
      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          // Añade cualquier otro campo que desees devolver
        }
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  });
});


// Ruta para cerrar sesión - No se necesita con JWT, ya que la sesión no se almacena en el servidor
router.get('/logout', (req, res) => {
  // No hay lógica de cerrar sesión del servidor ya que estamos usando JWT
  res.json({ message: 'Logout successful' });
});

module.exports = router;