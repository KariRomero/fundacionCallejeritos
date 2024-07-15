const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${path.basename(file.originalname)}`); // Nombre del archivo guardado
  },
});

const upload = multer({ storage }); // Configuración del middleware de Multer

module.exports = upload; // Exportar el middleware para su uso en otras partes de la aplicación