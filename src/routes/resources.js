


const express = require('express');
const router = express.Router();
const { getResources, getResource, createResource, updateResource, deleteResource } = require('../controllers/resourceController');
const auth = require('../middleware/auth');

router.get('/', getResources);
router.get('/:id', getResource);
router.post('/', auth, createResource);
router.put('/:id', auth, updateResource);
router.delete('/:id', auth, deleteResource);

module.exports = router;