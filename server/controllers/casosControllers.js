
const CasosDeRescate = require('../models/CasosDeRescate');
const cloudinary = require('../config/cloudinary');

const createCasos = async (casosData) => {
  return await CasosDeRescate.create(casosData);
};

const updateCasos = async (id, casosData) => {
  await CasosDeRescate.update(casosData, { where: { id } });
  return await CasosDeRescate.findByPk(id);
};

const deleteCasos = async (id) => {
  await CasosDeRescate.destroy({ where: { id } });
};

const getCasos = async (id) => {
  return await CasosDeRescate.findByPk(id);
};

const getAllCasos = async (order = 'ASC') => {
  return await CasosDeRescate.findAll({
    order: [['name', order]] 
  });
};

const uploadImage = async (casosId, imageFile) => {
  try {
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: 'casos_images', // Carpeta en Cloudinary donde se almacenarán las imágenes de casos de rescate
      use_filename: true,
      unique_filename: false,
    });

    const casos = await CasosDeRescate.findByPk(casosId);
    if (casos) {
      const updatedCasos = await casos.update({
        image: [...casos.image, result.secure_url], // Agrega la nueva imagen al array de imágenes de casos de rescate
      });
      return updatedCasos;
    } else {
      throw new Error('Casos de rescate no encontrado');
    }
  } catch (error) {
    throw new Error('Error subiendo imagen: ' + error.message);
  }
};

module.exports = {
  createCasos,
  updateCasos,
  deleteCasos,
  getCasos,
  getAllCasos,
  uploadImage,
};
