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
  deleteImageCasosHandler
} = require('../handlers/casosHandlers');


router.post('/', upload.array('imageFiles', 5), createCasosHandler);


router.post('/:id/image', upload.array('imageFiles', 5), uploadImageCasosHandler);

router.put('/:id', updateCasosHandler);
router.delete('/:id', deleteCasosHandler);
router.get('/:id', getCasosHandler);
router.get('/', getAllCasosHandler);
router.delete('/:id/image', deleteImageCasosHandler);
module.exports = router;