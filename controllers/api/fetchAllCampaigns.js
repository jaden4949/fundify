const Campaign = require('../models/campaign');

async function fetchAllCampaigns(req, res) {
  console.log('Fetching all campaigns...');
  try {
    const campaigns = await Campaign.find().populate('creator').exec();
    res.json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ error: 'An error occurred while fetching campaigns' });
  }
}

module.exports = {
  fetchAllCampaigns
};