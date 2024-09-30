const cloudinary = require('cloudinary').v2;

// Cloudinary konfigürasyon ayarları
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary bulut adı
  api_key: process.env.CLOUDINARY_API_KEY,       // Cloudinary API anahtarı
  api_secret: process.env.CLOUDINARY_API_SECRET   // Cloudinary API gizli anahtarı
});

module.exports = cloudinary;
