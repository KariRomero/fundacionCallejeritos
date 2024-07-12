const Adopciones = require("../models/Adopciones");
const cloudinary = require("../config/cloudinary");

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

const getAllAdopcion = async (filters = {}, order = 'ASC') => {
  const where = {};

  if (filters.gender) {
    where.gender = filters.gender;
  }

  if (filters.getsAlongWithDogs !== undefined) {
    where.getsAlongWithDogs = filters.getsAlongWithDogs;
  }

  if (filters.getsAlongWithCats !== undefined) {
    where.getsAlongWithCats = filters.getsAlongWithCats;
  }

  if (filters.getsAlongWithChildren !== undefined) {
    where.getsAlongWithChildren = filters.getsAlongWithChildren;
  }

  return await Adopciones.findAll({
    where,
    order: [['name', order]] 
  });
};
const uploadImage = async (adopcionId, imageFile) => {
  try {
    const result = await cloudinary.uploader.upload(imageFile, {
      folder: 'adopcion_images',
      use_filename: true,
      unique_filename: false,
    });

    const adopcion = await Adopciones.findByPk(adopcionId);
    if (!adopcion) {
      throw new Error('Adopción no encontrada');
    }

    // Verifica que adopcion.image es un array
    if (!Array.isArray(adopcion.image)) {
      adopcion.image = [];
    }

    adopcion.image.push(result.secure_url);
    await adopcion.save();

    return adopcion;
  } catch (error) {
    throw new Error(`Error subiendo imagen: ${error.message}`);
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
