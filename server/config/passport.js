const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // Ajusta la ruta según tu estructura de proyecto

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback" // Ajusta el callback URL según tu entorno
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Busca un usuario existente en la base de datos por Google ID
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
          gender: null, // Asigna un valor predeterminado
          address: null, // Asigna un valor predeterminado
          state: null, // Asigna un valor predeterminado
          postalCode: null, // Asigna un valor predeterminado
          phone: null, // Asigna un valo predeterminado
          mobile: null, // Asigna un valor predeterminado
          dni: null, // Asigna un valor predeterminado
          image: profile.photos ? [profile.photos[0].value] : [],
        });
      }

      // Pasa el usuario a la siguiente función
      done(null, user);
    } catch (error) {
      console.error('Error during authentication:', error);
      done(error, null);
    }
  }
));

// Serializa el usuario para almacenarlo en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializa el usuario desde la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;