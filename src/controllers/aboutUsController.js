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
    console.log(req.body, 'req.body');

    if (aboutUs) {
      // Update existing AboutUs document
      aboutUs.vision = vision;
      aboutUs.mission = mission;
      aboutUs.features = features;
      if (teamMembers) {
        // Validate team members
        for (const member of teamMembers) {
          if (!member.imagePath) {
            return res.status(400).json({ msg: 'imagePath is required for all team members.' });
          }
        }

        aboutUs.teamMembers = teamMembers.map(member => ({
          name: member.name,
          role: member.role,
          bio: member.bio,
          imagePath: member.imagePath,
          socialMedia: member.socialMedia,
        }));
      }
    } else {
      // Create new AboutUs document
      aboutUs = new AboutUs({ vision, mission, features, teamMembers });
    }

    await aboutUs.save();
    res.json(aboutUs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
