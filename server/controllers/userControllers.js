const User = require('../models/User');
const cloudinary = require('../config/cloudinary'); 
const Adopciones = require ('../models/Adopciones')
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

    const newUserData = { ...userData, image: imageUrl ? [imageUrl] : [] };
    return await User.create(newUserData);
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};


const updateUser = async (id, userData) => {
  // Validar si el usuario existe antes de actualizar
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Filtrar los campos que existen en el modelo de usuario
  const allowedFields = Object.keys(User.rawAttributes); // Obtén todos los campos definidos en el modelo
  const filteredUserData = Object.fromEntries(
    Object.entries(userData).filter(([key]) => allowedFields.includes(key))
  );

  // Actualizar los datos del usuario en la base de datos
  await User.update(filteredUserData, { where: { id } });

  // Obtener el usuario actualizado
  return await User.findByPk(id);
};

const deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

const getUser = async (id) => {
  return await User.findByPk(id, {
    include: {
      model: Adopciones,
      as: 'adopciones',  
      through: { attributes: [] }  
    }
  });
};

const getAllUsers = async () => {
  return await User.findAll({
    include: {
      model: Adopciones,
      as: 'adopciones', 
      through: { attributes: [] }  
    }
  });
};

const uploadImage = async (userId, imageFile) => {
  try {
    
    const result = await uploader.upload(imageFile, {
      folder: 'user_images',
      use_filename: true,
      unique_filename: false,
    });

  
    let user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    
    const updatedUser = await user.update({ image: [result.secure_url] });

   
    return updatedUser;
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