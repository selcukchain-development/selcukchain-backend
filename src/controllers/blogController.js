const cloudinary = require('../config/cloudinary');
const BlogPost = require('../models/BlogPost');
const fs = require('fs').promises;
const path = require('path');

exports.createBlogPost = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const blogPost = new BlogPost({
      ...req.body,
      imageUrl: imageUrl
    });

    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error('Error creating blog post:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogPosts);
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
};

exports.getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (err) {
    console.error('Error fetching blog post:', err);
    res.status(500).json({ message: 'Error fetching blog post' });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrl: imageUrl },
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.error('Error updating blog post:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog post:', err);
    res.status(500).json({ message: 'Error deleting blog post' });
  }
};