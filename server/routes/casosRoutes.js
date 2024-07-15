const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const {
  createCasosHandler,
  updateCasosHandler,
  deleteCasosHandler,
  getCasosHandler,
  getAllCasosHandler,
  uploadImageCasosHandler,
} = require('../handlers/casosHandlers');

// Añadir middleware de Multer para manejar la subida de imágenes en la creación de casos
router.post('/', upload.single('imageFile'), createCasosHandler);

// Mantener el middleware de Multer en la ruta de subida de imágenes para casos existentes
router.post('/:id/image', upload.single('imageFile'), uploadImageCasosHandler);

router.put('/:id', updateCasosHandler);
router.delete('/:id', deleteCasosHandler);
router.get('/:id', getCasosHandler);
router.get('/', getAllCasosHandler);

module.exports = router;