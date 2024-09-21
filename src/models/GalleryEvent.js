const mongoose = require('mongoose');

const GalleryEventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    default: 'medium',
  },
}, { timestamps: true });

module.exports = mongoose.model('GalleryEvent', GalleryEventSchema);
