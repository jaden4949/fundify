const Campaign = require('../../models/campaign');

// Controller function to create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, amount, photo } = req.body;
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
