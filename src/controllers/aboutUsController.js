const cloudinary = require('../config/cloudinary');
const AboutUs = require('../models/AboutUs');
const fs = require('fs').promises;
const path = require('path');

exports.createOrUpdateAboutUs = async (req, res) => {
  console.log('Received files:', req.files);
  console.log('Received body:', req.body);

  try {
    // Eğer dosya yüklenmemişse ve mevcut bir imageUrl yoksa hata fırlat
    if (!req.files && !req.body.imageUrl) {
      throw new Error('Missing required parameter - file or imageUrl');
    }

    let imageUrl = req.body.imageUrl || '';
    if (req.file) {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });

      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    }

    const aboutUsData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: imageUrl
    };

    let aboutUs;
    if (req.params.id) {
      aboutUs = await AboutUs.findByIdAndUpdate(req.params.id, aboutUsData, { new: true });
    } else {
      aboutUs = new AboutUs(aboutUsData);
      await aboutUs.save();
    }

    res.status(200).json({ message: 'About Us updated successfully' });
  } catch (err) {
    console.error('Error in createOrUpdateAboutUs:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne().sort({ createdAt: -1 });
    res.status(200).json(aboutUs);
  } catch (err) {
    console.error('Error fetching About Us:', err);
    res.status(500).json({ message: 'Error fetching About Us' });
  }
};
