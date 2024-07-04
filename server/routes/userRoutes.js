const express = require('express');
const router = express.Router();
const multer = require('multer'); // Importamos multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' }); // Configuramos multer con el directorio de destino

const {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
  getAllUsersHandler,
  uploadImageHandler // Importamos el nuevo handler para la carga de imágenes
} = require('../handlers/userHandlers');

router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);
router.get('/:id', getUserHandler);
router.get('/', getAllUsersHandler);

// Ruta para cargar una imagen de usuario
router.post('/:id/image', upload.single('image'), uploadImageHandler);

module.exports = router;
