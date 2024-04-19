const Campaign = require('../../models/campaign');

// Controller to create a new campaign
async function createCampaign(req, res) {
    console.log('---Backend Received campaign data:', req.body);

    // Extract campaign data from the request body
    const { title, description, goal, photo } = req.body;

    try {
        // Create a new campaign instance with raised amount initialized to 0
        const campaign = new Campaign({
            title,
            description,
            goal,
            photo,
            raised: 0 // Initialize raised amount to 0
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
      // Fetch all campaigns from the database, sorted by most recent first
      const campaigns = await Campaign.find().sort('-createdAt').limit(5);
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

// Controller to process a donation to a campaign
async function processDonation(req, res) {
    const { id } = req.params;
    const { amount } = req.body; // This should be the donation amount sent in the request body

    try {
        // Find the campaign by ID and update the raised amount
        const updatedCampaign = await Campaign.findByIdAndUpdate(
          id,
          { $inc: { raised: amount } }, // Increment the 'raised' amount by the donated amount
          { new: true }
        );

        // Send back the updated campaign
        res.status(200).json(updatedCampaign);
    } catch (error) {
        console.error('Error processing donation:', error);
        res.status(500).json({ error: 'An error occurred while processing the donation' });
    }
}

exports.processDonation = async (req, res) => {
    const { campaignId } = req.params;
    const { amount } = req.body; // Ensure that 'amount' is a number
  
    try {
      const campaign = await Campaign.findByIdAndUpdate(
        campaignId,
        { $inc: { raised: amount } }, // Increment 'raised' by the 'amount' number
        { new: true }
      );
  
      if (!campaign) {
        return res.status(404).json({ message: 'Campaign not found' });
      }
  
      if (isNaN(donationAmount) || typeof donationAmount !== 'number') {
        console.error('Invalid donation amount:', donationAmount);
        return; // Prevent the API call if the validation fails
      }
      
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ message: 'Error processing donation', error });
    }
  };
  
  
  
module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    processDonation // Make sure to export the processDonation function
};