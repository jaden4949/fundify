const Campaign = require('../models/campaign');

async function getCampaignById(req, res) {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({ error: 'An error occurred while fetching the campaign' });
    }
}

module.exports = {
    getCampaignById
};
