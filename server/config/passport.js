passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://fundacioncallejeritos-production.up.railway.app/auth/google/callback"  // URL de callback del backend en producción
    : "http://localhost:3001/auth/google/callback"  // URL de callback del backend en desarrollo
},
async (accessToken, refreshToken, profile, done) => {
    try {
      // Lógica de autenticación
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