


const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    const resource = await newResource.save();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndRemove(req.params.id);
    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }
    res.json({ msg: 'Resource removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};