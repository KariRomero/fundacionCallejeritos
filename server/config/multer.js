const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // Nombre de archivo personalizado
  },
});

// Configuración de Multer para manejar múltiples archivos
const upload = multer({ storage });

module.exports = upload;