const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  createAdopcionesHandler,
  updateAdopcionesHandler,
  deleteAdopcionesHandler,
  getAdopcionesHandler,
  getAllAdopcionesHandler,
  uploadImageAdopcionesHandler,
} = require('../handlers/adopcionesHandlers');

router.post('/', createAdopcionesHandler);
router.put('/:id', updateAdopcionesHandler);
router.delete('/:id', deleteAdopcionesHandler);
router.get('/:id', getAdopcionesHandler);
router.get('/', getAllAdopcionesHandler);

// Ruta para subir imagen de adopción
router.post('/:id/image', upload.single('image'), uploadImageAdopcionesHandler);

module.exports = router;
