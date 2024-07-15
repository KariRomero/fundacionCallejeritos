const express = require('express');
const router = express.Router();
const upload = require("../config/multer"); 

const {
  createAdopcionesHandler,
  updateAdopcionesHandler,
  deleteAdopcionesHandler,
  getAdopcionesHandler,
  getAllAdopcionesHandler,
  uploadImageAdopcionesHandler,
} = require('../handlers/adopcionesHandlers');

// Agregar el middleware de Multer a la ruta de creación de adopciones
router.post('/', upload.single('imageFile'), createAdopcionesHandler);

// Mantener el middleware de Multer en la ruta de subida de imágenes para adopciones existentes
router.post('/:id/image', upload.single('imageFile'), uploadImageAdopcionesHandler);

router.put('/:id', updateAdopcionesHandler);
router.delete('/:id', deleteAdopcionesHandler);
router.get('/:id', getAdopcionesHandler);
router.get('/', getAllAdopcionesHandler);

module.exports = router;