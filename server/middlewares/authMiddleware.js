const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token no válido' }); // Token inválido
      }

      req.user = user; // Guardar el usuario en req.user si el token es válido
      next(); // Continuar con la solicitud
    });
  } else {
    res.status(401).json({ error: 'Token no proporcionado' }); // No se proporcionó un token
  }
};

module.exports = { authenticateJWT };