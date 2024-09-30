const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Education', 'Talk', 'Workshop'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
