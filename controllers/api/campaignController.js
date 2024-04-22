const jwt = require('jsonwebtoken');
const Campaign = require('../../models/campaign');

// Controller function to create a new campaign
const createCampaign = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Access Denied / Unauthorized request');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access Denied / Unauthorized request');
    }

    // Decoding the JWT to get user ID
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decoded.user?._id;

    console.log("Decoded User ID:", userId); // This should log the correct user ID

    if (!userId) {
      return res.status(401).json({ error: "User ID not found in token" });
    }

    const { title, description, goal, photo } = req.body;
    const newCampaign = new Campaign({
      title,
      description,
      goal,
      photo,
      raised: 0,
      creator: userId // Setting the creator field with the userId from the JWT
    });

    await newCampaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ error: 'An error occurred while creating the campaign' });
  }
};

module.exports = { createCampaign };
