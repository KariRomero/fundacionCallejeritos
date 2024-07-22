const {
  createAdopcion,
  updateAdopcion,
  deleteAdopcion,
  getAdopcion,
  getAllAdopcion,
  uploadImage,
  deleteImage,
} = require('../controllers/adopcionesControllers');

const createAdopcionesHandler = async (req, res) => {
  try {
    const adopcion = await createAdopcion(req.body, req.files);
    res.status(201).json(adopcion);  // Aquí se retorna directamente la adopción creada
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAdopcionesHandler = async (req, res) => {
  try {
    const adopcion = await updateAdopcion(req.params.id, req.body);
    res.status(200).json(adopcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAdopcionesHandler = async (req, res) => {
  try {
    await deleteAdopcion(req.params.id);
    res.status(200).json({ message: 'Adopción correctamente eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdopcionesHandler = async (req, res) => {
  try {
    const adopcion = await getAdopcion(req.params.id);
    if (!adopcion) {
      return res.status(404).json({ error: 'Adopción no encontrada' });
    }
    res.status(200).json(adopcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAdopcionesHandler = async (req, res) => {
  try {
    const filters = req.query;
    const order = req.query.order || 'ASC'; 
    const adopciones = await getAllAdopcion(filters, order);
    res.status(200).json(adopciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadImageAdopcionesHandler = async (req, res) => {
  try {
    const adopcionId = req.params.id;
    const imageFiles = req.files; 

    const updatedImages = await uploadImage(adopcionId, imageFiles);
    res.status(200).json({ image: updatedImages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteImageAdopcionesHandler = async (req, res) => {
  try {
    const adopcionId = req.params.id;
    const { imageUrl } = req.body; 

    if (!imageUrl || !imageUrl.match(/^https?:\/\/.+/)) {
      throw new Error('Formato de URL inválido o URL no proporcionada');
    }

    const updatedAdopcion = await deleteImage(adopcionId, imageUrl);
    res.status(200).json(updatedAdopcion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdopcionesHandler,
  updateAdopcionesHandler,
  deleteAdopcionesHandler,
  getAdopcionesHandler,
  getAllAdopcionesHandler,
  uploadImageAdopcionesHandler,
  deleteImageAdopcionesHandler
};