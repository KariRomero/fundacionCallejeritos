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

router.post('/', createAdopcionesHandler);
router.put('/:id', updateAdopcionesHandler);
router.delete('/:id', deleteAdopcionesHandler);
router.get('/:id', getAdopcionesHandler);
router.get('/', getAllAdopcionesHandler);
router.post('/:id/image', upload.single('image'), uploadImageAdopcionesHandler);


module.exports = router;
