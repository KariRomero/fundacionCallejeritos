const Adopciones = require('../models/Adopciones');
const cloudinary = require('../utils/cloudinary');
const { uploader } = cloudinary;

const createAdopcion = async (adopcionData) => {
  return await Adopciones.create(adopcionData);
};

const updateAdopcion = async (id, adopcionData) => {
  await Adopciones.update(adopcionData, { where: { id } });
  return await Adopciones.findByPk(id);
};

const deleteAdopcion = async (id) => {
  return await Adopciones.destroy({ where: { id } });
};

const getAdopcion = async (id) => {
  return await Adopciones.findByPk(id);
};

const getAllAdopcion = async () => {
  return await Adopciones.findAll();
};

const uploadImage = async (adopcionId, imageFile) => {
  try {
    const result = await uploader.upload(imageFile, {
      folder: 'adopcion_images',
      use_filename: true,
      unique_filename: false,
    });

    const adopcion = await Adopciones.findByPk(adopcionId);
    if (adopcion) {
      const updatedAdopcion = await adopcion.update({
        image: [...adopcion.image, result.secure_url],
      });
      return updatedAdopcion;
    } else {
      throw new Error('Adopción no encontrada');
    }
  } catch (error) {
    throw new Error('Error subiendo imagen: ' + error.message);
  }
};

module.exports = {
  createAdopcion,
  updateAdopcion,
  deleteAdopcion,
  getAdopcion,
  getAllAdopcion,
  uploadImage,
};
