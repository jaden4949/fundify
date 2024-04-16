const Campaign = require('../../models/campaign');

// Controller to create a new campaign
async function createCampaign(req, res) {
    // Extract campaign data from the request body
    const { title, description, amount, photo } = req.body;

    try {
        // Create a new campaign instance
        const campaign = new Campaign({
            title,
            description,
            amount,
            photo
        });

        // Save the campaign to the database
        await campaign.save();

        // Respond with the newly created campaign
        res.status(201).json(campaign);
    } catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({ error: 'An error occurred while creating the campaign' });
    }
}

// Controller to get all campaigns
async function getAllCampaigns(req, res) {
    try {
        // Fetch all campaigns from the database
        const campaigns = await Campaign.find();

        // Respond with the list of campaigns
        res.json(campaigns);
    } catch (error) {
        console.error('Error getting campaigns:', error);
        res.status(500).json({ error: 'An error occurred while getting campaigns' });
    }
}

// Controller to get a specific campaign by ID
async function getCampaignById(req, res) {
    const { id } = req.params;

    try {
        // Find the campaign by ID
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Respond with the campaign
        res.json(campaign);
    } catch (error) {
        console.error('Error getting campaign by ID:', error);
        res.status(500).json({ error: 'An error occurred while getting the campaign' });
    }
}

// Controller to update a campaign
async function updateCampaign(req, res) {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Find the campaign by ID and update it
        const updatedCampaign = await Campaign.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Respond with the updated campaign
        res.json(updatedCampaign);
    } catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({ error: 'An error occurred while updating the campaign' });
    }
}

// Controller to delete a campaign
async function deleteCampaign(req, res) {
    const { id } = req.params;

    try {
        // Find the campaign by ID and delete it
        const deletedCampaign = await Campaign.findByIdAndDelete(id);

        if (!deletedCampaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Respond with a success message
        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({ error: 'An error occurred while deleting the campaign' });
    }
}

module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign
};
