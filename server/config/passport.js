const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const moment = require('moment');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ where: { googleId: profile.id } });

      if (!user) {
        // Extract as much data as possible from the profile
        const email = profile.emails[0]?.value;
        const nameParts = profile.displayName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        // Create a new user with the extracted data
        user = await User.create({
          googleId: profile.id,
          firstName: firstName || 'N/A',
          lastName: lastName || 'N/A',
          gender: profile.gender || 'male', // Assume 'male' if not provided
          address: 'N/A', // Google profile does not provide address
          birthDate: moment(profile.birthday).isValid() ? profile.birthday : moment('01/01/1970', 'DD/MM/YYYY').toDate(),
          city: 'N/A', // Google profile does not provide city
          state: 'N/A', // Google profile does not provide state
          postalCode: 'N/A', // Google profile does not provide postal code
          phone: 'N/A', // Google profile does not provide phone
          mobile: 'N/A', // Google profile does not provide mobile
          dni: 'N/A', // Google profile does not provide dni
          email: email || 'N/A',
          image: profile.photos ? [profile.photos[0].value] : [], // Extract profile picture
        });
      }

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;