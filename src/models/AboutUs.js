const mongoose = require('mongoose');

const AboutUsSchema = new mongoose.Schema({
  vision: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  features: [{
    icon: String,
    title: String,
    description: String,
  }],
  teamMembers: [{
    name: String,
    role: String,
    bio: String,
    imageUrl: {
      type: String,
      required: true,
    },
    socialMedia: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', AboutUsSchema);
