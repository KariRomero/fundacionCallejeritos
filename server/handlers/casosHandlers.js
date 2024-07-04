// casosHandlers.js

const {
    createCasos,
    updateCasos,
    deleteCasos,
    getCasos,
    getAllCasos,
    uploadImage,
  } = require('../controllers/casosControllers');
  
  const createCasosHandler = async (req, res) => {
    try {
      const casos = await createCasos(req.body);
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
      const casos = await getAllCasos();
      res.status(200).json(casos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const uploadImageCasosHandler = async (req, res) => {
    try {
      const casos = await uploadImage(req.params.id, req.file.path);
      res.status(200).json(casos);
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
  };
  