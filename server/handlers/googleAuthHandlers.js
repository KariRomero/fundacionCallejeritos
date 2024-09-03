const { googleLoginController, getCurrentUser, logoutUser } = require('../controllers/googleAuthControllers');

// Handler para iniciar sesión con Google
const googleLoginHandler = async (req, res) => {
  const { idToken } = req.body;  // Validar que el token se proporcione
  console.log("Body recibido en el backend:", req.body)
  if (!idToken) {
    return res.status(400).json({ error: 'Token de Google no proporcionado' });
  }

  try {
    const { user, token: appToken } = await googleLoginController(token);
    res.status(200).json({ user, token: appToken });
  } catch (error) {
    console.error('Error en googleLoginHandler:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Handler para obtener el usuario actual
const getCurrentUserHandler = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];  // Extraer el token del encabezado de autorización

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const user = await getCurrentUser(token);
    res.json({ user });
  } catch (error) {
    console.error('Error en getCurrentUserHandler:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Handler para cerrar sesión
const logoutHandler = (req, res) => {
  try {
    const response = logoutUser();
    res.json(response);
  } catch (error) {
    console.error('Error en logoutHandler:', error.message);
    res.status(500).json({ error: 'Error logging out' });
  }
};

module.exports = {
  googleLoginHandler,
  getCurrentUserHandler,
  logoutHandler,
};