const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ajusta la ruta según tu estructura de proyecto
require('dotenv').config(); // Cargar variables de entorno

// Configuración de la estrategia de autenticación de Google
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://fundacioncallejeritos-production.up.railway.app/auth/google/callback"  // URL de callback del backend en producción
    : "http://localhost:3001/auth/google/callback"  // URL de callback del backend en desarrollo
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Buscar un usuario existente en la base de datos por Google ID
    let user = await User.findOne({ where: { googleId: profile.id } });

    if (!user) {
      // Si el usuario no existe, crea uno nuevo
      const email = profile.emails[0]?.value || 'N/A';
      const nameParts = profile.displayName.split(' ');
      const firstName = nameParts[0] || 'N/A';
      const lastName = nameParts.slice(1).join(' ') || 'N/A';

      user = await User.create({
        googleId: profile.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: null,
        address: null,
        state: null,
        postalCode: null,
        phone: null,
        mobile: null,
        dni: null,
        image: profile.photos ? [profile.photos[0].value] : [],
      });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    // Pasar el usuario y el token generado a la siguiente función
    done(null, { user, token });
  } catch (error) {
    console.error('Error during authentication:', error);
    done(error, null);
  }
}));

// Serializar el usuario en la sesión (aunque no usaremos sesiones)
passport.serializeUser((userData, done) => {
  done(null, userData.user.id); // Serializa solo el ID del usuario
});

// Deserializar el usuario desde la sesión (aunque no usaremos sesiones)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;