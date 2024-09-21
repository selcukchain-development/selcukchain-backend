


const express = require('express');
const router = express.Router();
const { getGalleryEvents, getGalleryEvent, createGalleryEvent, updateGalleryEvent, deleteGalleryEvent } = require('../controllers/galleryEventController');
const auth = require('../middleware/auth');

router.get('/', getGalleryEvents);
router.get('/:id', getGalleryEvent);
router.post('/', auth, createGalleryEvent);
router.put('/:id', auth, updateGalleryEvent);
router.delete('/:id', auth, deleteGalleryEvent);

module.exports = router;