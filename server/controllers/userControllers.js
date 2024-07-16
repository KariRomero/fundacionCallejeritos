const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); 
const { uploader } = cloudinary; 

const createUser = async (userData, imageFile) => {
  try {
    let imageUrl = '';
    if (imageFile) {
      const result = await uploader.upload(imageFile, {
        folder: 'user_images', 
        use_filename: true,
        unique_filename: false,
      });
      imageUrl = result.secure_url;
    }

    const newUserData = { ...userData, images: imageUrl ? [imageUrl] : [] };
    return await User.create(newUserData);
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
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

const deleteImage = async (userId, imageUrl) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!Array.isArray(user.images)) {
      throw new Error('No images associated with this user');
    }

    const imageIndex = user.images.indexOf(imageUrl);
    if (imageIndex === -1) {
      throw new Error('Image not found in user');
    }

    user.images.splice(imageIndex, 1);
    await user.save();

    const publicId = imageUrl.split('/').pop().split('.')[0];
    await uploader.destroy(`user_images/${publicId}`);

    return user;
  } catch (error) {
    throw new Error(`Error deleting image: ${error.message}`);
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  uploadImage,
  deleteImage
};