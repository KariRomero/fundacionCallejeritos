const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controlador para iniciar sesión con Google
const googleLoginController = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, given_name: firstName, family_name: lastName, picture } = payload;

    if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error(`El 'audience' del token no coincide. Token aud: ${payload.aud}, CLIENT_ID esperado: ${process.env.GOOGLE_CLIENT_ID}`);
      throw new Error('Audience del token no válido');
    }

    // Buscar o crear usuario en la base de datos
    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      user = await User.create({
        googleId,
        email,
        firstName,
        lastName,
        image: picture,
      });
    }

    // Generar el token JWT propio de tu aplicación
    const appToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return { user, token: appToken };
  } catch (error) {
    console.error('Error en el inicio de sesión con Google:', error.message);
    // Devuelve el error específico para ayudar a depurar
    throw new Error(`Error en la autenticación con Google: ${error.message}`);
  }
};
// Controlador para obtener el usuario actual
const getCurrentUser = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    throw new Error('Error en la verificación del token o en la búsqueda del usuario');
  }
};

// Controlador para cerrar sesión
const logoutUser = () => {
  // Lógica adicional para cerrar sesión si es necesario
  return { message: 'Logout successful' };
};

module.exports = { googleLoginController, getCurrentUser, logoutUser };