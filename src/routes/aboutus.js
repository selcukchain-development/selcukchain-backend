const express = require('express');
const router = express.Router();
const { getAboutUs, createOrUpdateAboutUs } = require('../controllers/aboutUsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const multer = require('multer');
const storage = multer.memoryStorage();
const uploadConfig = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.fieldname.startsWith('teamMembers')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Herkese açık rota
router.get('/', getAboutUs);

// Sadece yetkilendirilmiş kullanıcılar için rota
router.post('/', upload.single('image'), createOrUpdateAboutUs);
router.put('/', upload.single('image'), createOrUpdateAboutUs);

// Rota tanımlaması
router.put('/update', uploadConfig.any(), async (req, res) => {
  // ... route handler logic ...
});

module.exports = router;
