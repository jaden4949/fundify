const Campaign = require('../../models/campaign');

// Controller function to create a new campaign
const createCampaign = async (req, res) => {
  try {
    let { title, description, amount, photo } = req.body;

    // If photo is an object (like FormData), extract the file name
    if (typeof photo === 'object' && photo !== null) {
      photo = photo.name; // Assuming the object has a name property
    }

    // Create a new campaign instance
    const newCampaign = new Campaign({
      title,
      description,
      amount,
      photo
    });

    // Save the campaign to the database
    await newCampaign.save();
    console.log("campaign created", newCampaign)
    res.status(201).json(newCampaign); // Return the created campaign
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createCampaign };
