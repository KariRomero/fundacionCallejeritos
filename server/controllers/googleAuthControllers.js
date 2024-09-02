// controllers/authController.js
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Asegúrate de ajustar la ruta según tu estructura de proyecto

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controlador para iniciar sesión con Google
const googleLoginController = async (token) => {
  try {
    // Verificar el token de Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();  // Extraer la información del usuario del token de Google
    const { sub: googleId, email, given_name: firstName, family_name: lastName, picture } = payload;

    // Buscar al usuario en la base de datos por googleId
    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      // Si el usuario no existe, lo creamos con googleId
      user = await User.create({
        googleId,
        email,
        firstName,
        lastName,
        image: picture,
      });
      console.log('Usuario creado:', user);  // Verificar que el usuario se crea
    } else {
      console.log('Usuario encontrado:', user);  // Verificar que el usuario se encuentra
    }

    // Genera el token JWT propio de tu aplicación
    const appToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    return { user, token: appToken };
  } catch (error) {
    console.error('Error en el inicio de sesión con Google:', error);
    throw new Error('Token inválido');
  }
};

const getCurrentUser = async (req, res) => {
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
          image: user.image, // Añade cualquier otro campo que desees devolver
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Error fetching user' });
    }
  });
};
const logoutUser = (req, res) => {
  // Aquí puedes manejar cualquier lógica de limpieza si es necesario
  res.json({ message: 'Logout successful' });
};


module.exports = { googleLoginController, getCurrentUser,logoutUser };