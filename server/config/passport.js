passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://fundacioncallejeritos-production.up.railway.app/auth/google/callback" 
    : "http://localhost:3001/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Manejo de usuarios
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      const email = profile.emails[0]?.value || 'N/A';
      const nameParts = profile.displayName.split(' ');
      const firstName = nameParts[0] || 'N/A';
      const lastName = nameParts.slice(1).join(' ') || 'N/A';

      user = await User.create({
        googleId: profile.id,
        firstName,
        lastName,
        email,
        image: profile.photos ? [profile.photos[0].value] : [],
      });
    }
    done(null, user);
  } catch (error) {
    console.error('Error during authentication:', error);
    done(error, null);
  }
}
));