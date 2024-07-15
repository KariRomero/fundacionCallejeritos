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
  deleteImageAdopcionesHandler
} = require('../handlers/adopcionesHandlers');


router.post('/', upload.array('imageFiles', 5), createAdopcionesHandler);
router.post('/:id/image', upload.array('imageFiles', 5), uploadImageAdopcionesHandler);
router.put('/:id', updateAdopcionesHandler);
router.delete('/:id', deleteAdopcionesHandler);
router.get('/:id', getAdopcionesHandler);
router.get('/', getAllAdopcionesHandler);
router.delete('/:id/image', deleteImageAdopcionesHandler);

module.exports = router;