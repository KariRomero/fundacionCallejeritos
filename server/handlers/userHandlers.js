const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  uploadImage // Agregamos la función de carga de imagen
} = require('../controllers/userControllers');

const createUserHandler = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsersHandler = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handler para la carga de imágenes
const uploadImageHandler = async (req, res) => {
  const userId = req.params.id;
  const imageFile = req.file.path; // Asumiendo que multer o un middleware similar guarda la imagen en req.file.path
  try {
    const user = await uploadImage(userId, imageFile);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
  getAllUsersHandler,
  uploadImageHandler // Agregamos el handler de carga de imagen
};
