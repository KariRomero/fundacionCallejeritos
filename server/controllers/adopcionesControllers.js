const Adopciones = require("../models/Adopciones");
const cloudinary = require("../config/cloudinary");

const createAdopcion = async (adopcionData, imageFiles) => {
  try {
    const newAdopcion = await Adopciones.create(adopcionData);

    if (imageFiles && Array.isArray(imageFiles)) {
      const uploadPromises = imageFiles.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'adopcion_images',
          use_filename: true,
          unique_filename: false,
        });
        return result.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      // Añadir las URLs de las imágenes subidas al campo 'image' de la adopción
      newAdopcion.image = [...newAdopcion.image, ...uploadedImages];
      await newAdopcion.save(); // Guardar la adopción actualizada con las URLs de las imágenes
    }

    return newAdopcion;
  } catch (error) {
    throw new Error('Error creating adoption: ' + error.message);
  }
};
const updateAdopcion = async (id, adopcionData) => {
  await Adopciones.update(adopcionData, { where: { id } });
  return await Adopciones.findByPk(id);
};

const deleteAdopcion = async (id) => {
  return await Adopciones.destroy({ where: { id } });
};

const getAdopcion = async (id) => {
  const adopcion = await Adopciones.findByPk(id);
  if (!adopcion) {
    throw new Error('Adopción no encontrada');
  }
  return adopcion;
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

const uploadImage = async (adopcionId, imageFiles) => {
  try {
    // Subir todas las imágenes a Cloudinary
    const uploadPromises = imageFiles.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'adopcion_images',
        use_filename: true,
        unique_filename: false,
      });
      return result.secure_url;
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Buscar el registro de adopción por ID
    const adopcion = await Adopciones.findByPk(adopcionId);
    if (!adopcion) {
      throw new Error('Adopción no encontrada');
    }

    // Asegurarse de que el campo de imágenes sea un array
    if (!Array.isArray(adopcion.image)) {
      adopcion.image = [];
    }

    // Agregar las nuevas imágenes al array existente
    adopcion.image = [...adopcion.image, ...uploadedImages];

    // Guardar el registro actualizado en la base de datos
    await adopcion.save();

    // Devolver solo el array de imágenes actualizado
    return adopcion.image;
  } catch (error) {
    throw new Error(`Error subiendo imágenes: ${error.message}`);
  }
};

const deleteImage = async (adopcionId, imageUrl) => {
  try {
    const adopcion = await Adopciones.findByPk(adopcionId);
    if (!adopcion) {
      throw new Error('Adopción no encontrada');
    }

    if (!Array.isArray(adopcion.image)) {
      throw new Error('No hay imágenes asociadas con esta adopción');
    }

    const imageIndex = adopcion.image.indexOf(imageUrl);
    if (imageIndex === -1) {
      throw new Error('Imagen no encontrada en la adopción');
    }

    // Eliminar la URL de la imagen del array
    adopcion.image.splice(imageIndex, 1);
    await adopcion.save();

    // Eliminar la imagen de Cloudinary
    const publicId = imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`adopcion_images/${publicId}`);

    return adopcion;
  } catch (error) {
    throw new Error(`Error eliminando imagen: ${error.message}`);
  }
};


module.exports = {
  createAdopcion,
  updateAdopcion,
  deleteAdopcion,
  getAdopcion,
  getAllAdopcion,
  uploadImage,
  deleteImage
};
