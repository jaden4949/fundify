const jwt = require('jsonwebtoken');
const Campaign = require('../../models/campaign');
const { decodeToken } = require('../../src/utilities/jwtUtils');

// Controller to create a new campaign
async function createCampaign(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.userId = decoded.id; // Assuming the user's ID is stored under 'id' in the JWT payload

        console.log("Decoded ID:", decoded.id); // This should print the decoded user ID
        
        // Log the entire request body to make sure everything is received correctly
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


// Controller to get all campaigns
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

// Controller to get campaigns created by a specific user
async function getCampaignsByUserId(req, res) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ error: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.id;

        const userCampaigns = await Campaign.find({ creator: userId }).sort('-createdAt');
        res.json(userCampaigns);
    } catch (error) {
        console.error('Error fetching user campaigns:', error);
        res.status(500).json({ error: 'An error occurred while fetching the user campaigns' });
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
        return res.status(404).json({ error: 'Campaign not found' });
      }

      // Return the updated campaign
      return res.status(200).json(campaign);
    } catch (error) {
      console.error('Error processing donation:', error);
      return res.status(500).json({ error: 'An error occurred while processing the donation' });
    }
  };

// Export all the controllers
module.exports = {
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaign,
    deleteCampaign,
    processDonation,
    getCampaignsByUserId
};