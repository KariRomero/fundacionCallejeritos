const CasosDeRescate = require('../models/CasosDeRescate');
const cloudinary = require('../config/cloudinary');

const createCasos = async (casosData, imageFiles) => {
  try {
    let imageUrls = [];
    if (imageFiles && Array.isArray(imageFiles)) {
      const uploadPromises = imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'casos_images',
          use_filename: true,
          unique_filename: false,
        });
        return result.secure_url;
      });
      imageUrls = await Promise.all(uploadPromises);
    }

    const newCasosData = { ...casosData, image: imageUrls };
    return await CasosDeRescate.create(newCasosData);
  } catch (error) {
    throw new Error('Error creando caso de rescate: ' + error.message);
  }
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

const uploadImage = async (casosId, imageFiles) => {
  try {
    
    const casos = await CasosDeRescate.findByPk(casosId);
    if (!casos) {
      throw new Error('Casos de rescate no encontrado');
    }

    
    if (imageFiles && Array.isArray(imageFiles)) {
      
      const uploadPromises = imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'casos_images',
          use_filename: true,
          unique_filename: false,
        });
        return result.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      
      if (!Array.isArray(casos.image)) {
        casos.image = [];
      }

     
      casos.image = [...casos.image, ...uploadedImages];

    
      const updatedCasos = await casos.save();

      return updatedCasos;
    } else {
      throw new Error('No se proporcionaron archivos de imagen');
    }
  } catch (error) {
    throw new Error('Error subiendo imagen: ' + error.message);
  }
};

const deleteImage = async (casosId, imageUrl) => {
  try {
    const casos = await CasosDeRescate.findByPk(casosId);
    if (!casos) {
      throw new Error('Caso de rescate no encontrado');
    }

    if (!Array.isArray(casos.image)) {
      throw new Error('No hay imágenes asociadas con este caso de rescate');
    }

    const imageIndex = casos.image.indexOf(imageUrl);
    if (imageIndex === -1) {
      throw new Error('Imagen no encontrada en el caso de rescate');
    }

    
    casos.image.splice(imageIndex, 1);
    await casos.save();

    
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`casos_images/${publicId}`);

    return casos;
  } catch (error) {
    throw new Error(`Error eliminando imagen: ${error.message}`);
  }
};

module.exports = {
  createCasos,
  updateCasos,
  deleteCasos,
  getCasos,
  getAllCasos,
  uploadImage,
  deleteImage
};