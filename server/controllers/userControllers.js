const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); // Importa la configuración de Cloudinary
const { uploader } = cloudinary; // Asumiendo que tienes un método uploader en tu configuración

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (id, userData) => {
  await User.update(userData, { where: { id } });
  return await User.findByPk(id);
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const getUser = async (id) => {
  return await User.findByPk(id);
};

const getAllUsers = async () => {
  return await User.findAll();
};

const uploadImage = async (userId, imageFile) => {
  try {
    // Subir la imagen a Cloudinary
    const result = await uploader.upload(imageFile, {
      folder: 'user_images', // Carpeta en Cloudinary donde se almacenarán las imágenes de usuario
      use_filename: true,
      unique_filename: false,
    });

    // Obtener el usuario y actualizar la propiedad de imágenes
    let user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Actualizar el campo de imágenes en el modelo User
    const updatedImages = [...user.images, result.secure_url]; // Agrega la nueva imagen al array de imágenes del usuario
    await user.update({ images: updatedImages });

    // Retorna el usuario actualizado con las imágenes
    return await User.findByPk(userId);
  } catch (error) {
    throw new Error('Error uploading image: ' + error.message);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  uploadImage,
};
