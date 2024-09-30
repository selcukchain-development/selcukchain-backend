const AboutUs = require('../models/AboutUs');
const fs = require('fs').promises;
const path = require('path');
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');

exports.createAboutUs = async (req, res) => {
  try {
    let imageUrl = '';
    if (req.file) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
      
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const aboutUs = new AboutUs({
      ...req.body,
      imageUrl: imageUrl
    });

    const newAboutUs = await aboutUs.save();
    res.status(201).json(newAboutUs);
  } catch (err) {
    console.error('Error creating About Us:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    res.json(aboutUs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateAboutUs = [
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'teamMembers', maxCount: 10 } // Adjust maxCount as needed
  ]),
  async (req, res) => {
    try {
      let imageUrl = req.body.imageUrl;
      if (req.files && req.files['image']) {
        const result = await cloudinary.uploader.upload(req.files['image'][0].path);
        imageUrl = result.secure_url;
        await fs.unlink(req.files['image'][0].path);
      }

      const { vision, mission, features } = req.body;
      let teamMembers = [];
      if (req.body.teamMembers) {
        teamMembers = JSON.parse(req.body.teamMembers);
      }

      let aboutUs = await AboutUs.findOne();

      if (aboutUs) {
        aboutUs.vision = vision;
        aboutUs.mission = mission;
        aboutUs.features = JSON.parse(features);
        aboutUs.imageUrl = imageUrl;
        aboutUs.teamMembers = teamMembers;
      } else {
        aboutUs = new AboutUs({
          vision,
          mission,
          features: JSON.parse(features),
          teamMembers,
          imageUrl
        });
      }

      // Handle team member images
      if (req.files && req.files['teamMembers']) {
        for (let i = 0; i < req.files['teamMembers'].length; i++) {
          const result = await cloudinary.uploader.upload(req.files['teamMembers'][i].path);
          aboutUs.teamMembers[i].image = result.secure_url;
          await fs.unlink(req.files['teamMembers'][i].path);
        }
      }

      await aboutUs.save();
      res.json(aboutUs);
    } catch (err) {
      console.error('Error updating About Us:', err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  }
];
