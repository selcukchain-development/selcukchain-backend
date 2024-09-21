


const Feature = require('../models/Feature');

exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getFeature = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createFeature = async (req, res) => {
  try {
    const newFeature = new Feature(req.body);
    const feature = await newFeature.save();
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findByIdAndRemove(req.params.id);
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.json({ msg: 'Feature removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};