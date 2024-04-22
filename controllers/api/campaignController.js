const jwt = require('jsonwebtoken');
const Campaign = require('../../models/campaign');

const createCampaign = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header sent' });
    }

    const token = authHeader.split(' ')[1]; // Assuming Bearer token format
    if (!token) {
      return res.status(401).json({ message: 'Malformed authorization header' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    let { title, description, goal, photo } = req.body;

    // If photo is an object (like FormData), extract the file name
    if (typeof photo === 'object' && photo!== null) {
      photo = photo.name; // Assuming the object has a name property
    }

    console.log("Decoded User ID:", decoded.userId);
    console.log("User ID from request body:", req.body.userId);

    // Create a new campaign instance
    const newCampaign = new Campaign({
      title,
      description,
      goal, // Use 'goal' here as it's been destructured from `req.body`
      photo,
      raised: 0, // Set the initial raised amount to 0
      creator: decoded.userId // Set the creator field with the userId from the JWT
    });

    // Save the campaign to the database
    await newCampaign.save();
    console.log("campaign created", newCampaign)
    res.status(201).json(newCampaign); // Return the created campaign
  } catch (error) {
    // You'll want to handle JWT-specific errors separately for more accurate error responses
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createCampaign };