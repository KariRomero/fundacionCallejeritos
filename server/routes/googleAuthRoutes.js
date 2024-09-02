const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

const CLIENT_HOME_PAGE_URL = process.env.NODE_ENV === 'production' ? 'https://fundacion-callejeritos.vercel.app' : 'http://localhost:5173';

// Ruta para iniciar el proceso de autenticación con Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => {
    const user = req.user; // Usuario autenticado
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Devuelve el token y los datos del usuario al frontend
    res.redirect(`${CLIENT_HOME_PAGE_URL}/?token=${token}`);
  }
);

// Ruta para obtener la autenticación del usuario actual usando JWT
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'https://fundacioncallejeritos-production.up.railway.app/auth/current_user',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data) {
      dispatch(getCurrentUser(response.data));
    } else {
      dispatch(logOutGoogle());
    }
  } catch (error) {
    console.error("Fetching current user failed:", error);
    dispatch(logOutGoogle());
  }
};
// Ruta para cerrar sesión - No se necesita con JWT, ya que la sesión no se almacena en el servidor
router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;