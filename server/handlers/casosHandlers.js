// casosHandlers.js

const {
    createCasos,
    updateCasos,
    deleteCasos,
    getCasos,
    getAllCasos,
    uploadImage,
    deleteImage
  } = require('../controllers/casosControllers');
  
  const createCasosHandler = async (req, res) => {
    try {
      const casosData = req.body;
      const imageFiles = req.files; 
      const casos = await createCasos(casosData, imageFiles);
      res.status(201).json(casos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const updateCasosHandler = async (req, res) => {
    try {
      const casos = await updateCasos(req.params.id, req.body);
      res.status(200).json(casos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteCasosHandler = async (req, res) => {
    try {
      await deleteCasos(req.params.id);
      res.status(204).json({ message: 'Casos de rescate correctamente eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCasosHandler = async (req, res) => {
    try {
      const casos = await getCasos(req.params.id);
      if (!casos) {
        return res.status(404).json({ error: 'Casos de rescate no encontrado' });
      }
      res.status(200).json(casos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllCasosHandler = async (req, res) => {
    try {
      const order = req.query.order || 'ASC'; 
      const casos = await getAllCasos(order);
      res.status(200).json(casos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const uploadImageCasosHandler = async (req, res) => {
    try {
      const casosId = req.params.id;
      const imageFiles = req.files; 
  
      const updatedCasos = await uploadImage(casosId, imageFiles);
      res.status(200).json(updatedCasos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteImageCasosHandler = async (req, res) => {
    try {
      const casosId = req.params.id;
      const { imageUrl } = req.body; 
      if (!imageUrl || !imageUrl.match(/^https?:\/\/.+/)) {
        throw new Error('Formato de URL inválido o URL no proporcionada');
      }
  
      const updatedCasos = await deleteImage(casosId, imageUrl);
      res.status(200).json(updatedCasos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {
    createCasosHandler,
    updateCasosHandler,
    deleteCasosHandler,
    getCasosHandler,
    getAllCasosHandler,
    uploadImageCasosHandler,
    deleteImageCasosHandler,
  };
  