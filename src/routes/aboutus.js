const express = require('express');
const router = express.Router();
const { getAboutUs, updateAboutUs } = require('../controllers/aboutUsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


router.get('/', getAboutUs);
router.put('/', upload.single('image'), updateAboutUs);

module.exports = router;
