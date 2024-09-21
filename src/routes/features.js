const express = require('express');
const router = express.Router();
const { getFeatures, getFeature, createFeature, updateFeature, deleteFeature } = require('../controllers/featureController');
const auth = require('../middleware/auth');

router.get('/', getFeatures);
router.get('/:id', getFeature);
router.post('/', auth, createFeature);
router.put('/:id', auth, updateFeature);
router.delete('/:id', auth, deleteFeature);

module.exports = router;