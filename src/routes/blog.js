const express = require('express');
const router = express.Router();
const { 
  createBlogPost, 
  getAllBlogPosts, 
  getBlogPostById, 
  updateBlogPost, 
  deleteBlogPost 
} = require('../controllers/blogController');
const upload = require('../middleware/upload');

// Create a new blog post
router.post('/', upload.single('image'), createBlogPost);

// Get all blog posts
router.get('/', getAllBlogPosts);

// Get a specific blog post by ID
router.get('/:id', getBlogPostById);

// Update a blog post
router.put('/:id', upload.single('image'), updateBlogPost);

// Delete a blog post
router.delete('/:id', deleteBlogPost);

module.exports = router;
