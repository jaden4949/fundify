const express = require('express');
const router = express.Router();
const authenticateToken = require('../../config/checkToken'); 

// Import named exports from campaignController.js
const { createCampaign } = require('../../controllers/api/campaignController');

// Import named exports from campaigns.js
const { 
  getAllCampaigns, 
  getCampaignById, 
  updateCampaign, 
  deleteCampaign,
  processDonation,
  getCampaignsByUserId // Make sure this function is exported as a named export
} = require('../../controllers/api/campaigns');

// Route to create a new campaign
router.post('/new', createCampaign);

// Route to get all campaigns
router.get('/', getAllCampaigns);

// Route to get a specific campaign by ID
router.get('/:id', getCampaignById);

router.get('/user/:userId', authenticateToken, getCampaignsByUserId);

// Route to update a campaign
router.put('/:id', updateCampaign);

// Route to delete a campaign
router.delete('/:id', deleteCampaign);

// Route for processing donations, adjust the path to match your API design
// If your client is expecting '/:id/donate' then change the path accordingly
router.post('/:id/donate', processDonation);

module.exports = router;
