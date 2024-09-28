const mongoose = require('mongoose');

const JoinSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  blockchain: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  school: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    enum: ['1', '2', '3', '4', '5+', 'graduate'],
    required: true
  },
  interests: [{
    type: String,
    enum: ['DeFi', 'NFTs', 'Smart Contracts', 'Cryptocurrency']
  }],
  role: {
    type: String,
    enum: ['designer', 'developer', 'social_media', 'community_manager', 'marketing'],
    required: true
  }
}, {
  timestamps: true
});

const Join = mongoose.model('Join', JoinSchema);

module.exports = Join;
