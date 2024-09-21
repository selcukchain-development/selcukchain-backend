


const GalleryEvent = require('../models/GalleryEvent');

exports.getGalleryEvents = async (req, res) => {
  try {
    const galleryEvents = await GalleryEvent.find();
    res.json(galleryEvents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGalleryEvent = async (req, res) => {
  try {
    const galleryEvent = await GalleryEvent.findById(req.params.id);
    if (!galleryEvent) {
      return res.status(404).json({ msg: 'Gallery event not found' });
    }
    res.json(galleryEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createGalleryEvent = async (req, res) => {
  try {
    const newGalleryEvent = new GalleryEvent(req.body);
    const galleryEvent = await newGalleryEvent.save();
    res.json(galleryEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateGalleryEvent = async (req, res) => {
  try {
    const galleryEvent = await GalleryEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!galleryEvent) {
      return res.status(404).json({ msg: 'Gallery event not found' });
    }
    res.json(galleryEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteGalleryEvent = async (req, res) => {
  try {
    const galleryEvent = await GalleryEvent.findByIdAndRemove(req.params.id);
    if (!galleryEvent) {
      return res.status(404).json({ msg: 'Gallery event not found' });
    }
    res.json({ msg: 'Gallery event removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};