const express = require('express');
const router = express.Router();
const upload = require('../config/multer');

const {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
  getAllUsersHandler,
  uploadImageUserHandler,
} = require('../handlers/userHandlers');

// Añadir middleware de Multer para manejar la subida de imágenes en la creación de usuarios
router.post('/', upload.single('imageFile'), createUserHandler);

// Mantener el middleware de Multer en la ruta de subida de imágenes para usuarios existentes
router.post('/:id/image', upload.single('imageFile'), uploadImageUserHandler);

router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);
router.get('/:id', getUserHandler);
router.get('/', getAllUsersHandler);

module.exports = router;