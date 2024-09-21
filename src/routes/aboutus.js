const express = require('express');
const router = express.Router();
const { getAboutUs, updateAboutUs } = require('../controllers/aboutUsController');
const auth = require('../middleware/auth');

router.get('/', getAboutUs);
router.put('/', updateAboutUs);

module.exports = router;
