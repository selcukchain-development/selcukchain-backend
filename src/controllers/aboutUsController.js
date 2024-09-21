const AboutUs = require('../models/AboutUs');

exports.getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.findOne();
    res.json(aboutUs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateAboutUs = async (req, res) => {
  try {
    const { vision, mission, features, teamMembers } = req.body;
    let aboutUs = await AboutUs.findOne();

    if (aboutUs) {
      aboutUs.vision = vision;
      aboutUs.mission = mission;
      aboutUs.features = features;
      aboutUs.teamMembers = teamMembers;
    } else {
      aboutUs = new AboutUs({ vision, mission, features, teamMembers });
    }

    await aboutUs.save();
    res.json(aboutUs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
