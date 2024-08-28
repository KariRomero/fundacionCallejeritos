const User = require('../models/User');
const Adopciones = require('../models/Adopciones');

const adoptarController = async (userId, adopcionId) => {
  try {
    const user = await User.findByPk(userId);
    const adopcion = await Adopciones.findByPk(adopcionId);

    if (!user || !adopcion) {
      throw new Error('Usuario o adopción no encontrados');
    }

    
    await adopcion.addUsuario(user);

    return { message: 'Adopción exitosa' };
  } catch (error) {
    throw error;
  }
};




module.exports = { adoptarController };