// handlers/authHandlers.js
const { googleLoginController, getCurrentUser, logoutUser } = require('../controllers/googleAuthControllers');

// Handler para iniciar sesión con Google
const googleLoginHandler = async (req, res) => {
  const { token } = req.body;  // Asegúrate de que el token de Google se envía en el cuerpo de la solicitud

  try {
    const { user, token: appToken } = await googleLoginController(token);  // Llamar al controlador
    res.status(200).json({ user, token: appToken });  // Devolver el usuario y el token JWT
  } catch (error) {
    console.error('Error en googleLoginHandler:', error);
    res.status(400).json({ error: error.message });
  }
};

// Handler para obtener el usuario actual
const getCurrentUserHandler = async (req, res) => {
  try {
    await getCurrentUser(req, res);  // Llamar al controlador directamente, ya que maneja la respuesta
  } catch (error) {
    console.error('Error en getCurrentUserHandler:', error);
    res.status(500).json({ error: 'Error fetching current user' });
  }
};

// Handler para cerrar sesión
const logoutHandler = (req, res) => {
  try {
    logoutUser(req, res);  // Llamar al controlador de cierre de sesión
  } catch (error) {
    console.error('Error en logoutHandler:', error);
    res.status(500).json({ error: 'Error logging out' });
  }
};

module.exports = {
  googleLoginHandler,
  getCurrentUserHandler,
  logoutHandler,
};