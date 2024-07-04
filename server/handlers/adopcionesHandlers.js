const {
    createAdopcion,
    updateAdopcion,
    deleteAdopcion,
    getAdopcion,
    getAllAdopcion,
    uploadImage,
  } = require('../controllers/adopcionesControllers');
  
  const createAdopcionesHandler = async (req, res) => {
    try {
      const adopcion = await createAdopcion(req.body);
      res.status(201).json(adopcion);
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
      const adopciones = await getAllAdopcion();
      res.status(200).json(adopciones);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const uploadImageAdopcionesHandler = async (req, res) => {
    try {
      const adopcionId = req.params.id;
      const imageFile = req.file.path; // Path del archivo subido por multer
  
      const updatedAdopcion = await uploadImage(adopcionId, imageFile);
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
  };
  