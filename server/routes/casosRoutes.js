
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  createCasosHandler,
  updateCasosHandler,
  deleteCasosHandler,
  getCasosHandler,
  getAllCasosHandler,
  uploadImageCasosHandler,
} = require('../handlers/casosHandlers');

router.post('/', createCasosHandler);
router.put('/:id', updateCasosHandler);
router.delete('/:id', deleteCasosHandler);
router.get('/:id', getCasosHandler);
router.get('/', getAllCasosHandler);


router.post('/:id/image', upload.single('image'), uploadImageCasosHandler);

module.exports = router;
