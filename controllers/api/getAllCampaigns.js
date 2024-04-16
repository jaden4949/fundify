const Campaign = require('../models/campaign');

async function getAllCampaigns(req, res) {
    try {
        const campaigns = await Campaign.find();
        res.json(campaigns);
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({ error: 'An error occurred while fetching campaigns' });
    }
}

module.exports = {
    getAllCampaigns
};
