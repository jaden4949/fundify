const jwt = require('jsonwebtoken');
const Campaign = require('../../models/campaign');
const { decodeToken } = require('../../src/utilities/jwtUtils');

async function createCampaign(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = decoded.id;

        console.log("Decoded ID:", decoded.id);
        console.log("Request Body:", req.body);

        const { title, description, goal, photo, userId } = req.body;
        const campaign = new Campaign({
            title,
            description,
            goal,
            photo,
            raised: 0,
            creator: userId
        });

        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        console.error('Error creating campaign:', error.message);
        res.status(500).json({ error: 'An error occurred while creating the campaign' });
    }
}

async function getAllCampaigns(req, res) {
    const { limit } = req.query;
    try {
        let query = Campaign.find().sort('-createdAt');
        if (limit) {
            query = query.limit(Number(limit));
        }
        const campaigns = await query;
        res.json(campaigns);
    } catch (error) {
        console.error('Error getting campaigns:', error);
        res.status(500).json({ error: 'An error occurred while getting campaigns' });
    }
}

async function getCampaignById(req, res) {
    const { id } = req.params;
    try {
        const campaign = await Campaign.findById(id);
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(campaign);
    } catch (error) {
        console.error('Error getting campaign by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the campaign' });
    }
}

async function getCampaignsByUserId(req, res) {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const userId = req.user._id;
        const campaigns = await Campaign.find({ creator: userId });
        res.json(campaigns);
    } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        res.status(500).send('Server error');
    }
}

async function updateCampaign(req, res) {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json(updatedCampaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'An error occurred while updating the campaign' });
    }
}

async function deleteCampaign(req, res) {
    const { id } = req.params;
    try {
        const deletedCampaign = await Campaign.findByIdAndDelete(id);
        if (!deletedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'An error occurred while deleting the campaign' });
    }
}

async function processDonation(req, res) {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const updatedCampaign = await Campaign.findByIdAndUpdate(
            id,
            { $inc: { raised: amount } },
            { new: true }
        );
        res.status(200).json(updatedCampaign);
    } catch (error) {
        console.error('Error processing donation:', error);
        res.status(500).json({ error: 'An error occurred while processing the donation' });
    }
}

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    processDonation,
    getCampaignsByUserId
};