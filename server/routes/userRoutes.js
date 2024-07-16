const express = require('express');
const router = express.Router();
const upload = require("../config/multer");

const {
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserHandler,
  getAllUsersHandler,
  uploadImageHandler,
  deleteImageUserHandler
} = require('../handlers/userHandlers');

router.post('/', createUserHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);
router.get('/:id', getUserHandler);
router.get('/', getAllUsersHandler);
router.post('/:id/image', upload.single('image'), uploadImageHandler);
router.delete('/:id/image', deleteImageUserHandler);
module.exports = router;