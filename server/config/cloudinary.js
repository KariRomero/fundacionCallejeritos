const cloudinary = require('cloudinary').v2;
require('dotenv').config();


// O alternativamente, si estás usando CLOUDINARY_URL:
cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL,
});

module.exports = cloudinary;