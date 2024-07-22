const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  uploadImage,
  deleteImage
} = require('../controllers/userControllers');

const createUserHandler = async (req, res) => {
  try {
    const { body } = req;
    const imageFile = req.file ? req.file.path : null;

    if (!imageFile && !body.imageFile) {
      throw new Error('No file uploaded');
    }

   
    const userData = { ...body, imageFile: imageFile || body.imageFile };
    const user = await createUser(userData, imageFile || body.imageFile);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await updateUser(id, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
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

const uploadImageHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const imageFile = req.file ? req.file.path : null;

    if (!imageFile) {
      throw new Error('No file uploaded');
    }

    const updatedUser = await uploadImage(userId, imageFile);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteImageUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const { imageUrl } = req.body;

    if (!imageUrl || !imageUrl.match(/^https?:\/\/.+/)) {
      throw new Error('Invalid URL format or URL not provided');
    }

    const updatedUser = await deleteImage(userId, imageUrl);
    res.status(200).json(updatedUser);
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
  uploadImageHandler,
  deleteImageUserHandler,
};