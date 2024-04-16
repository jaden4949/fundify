const express = require('express');
const router = express.Router();
const { createCampaign } = require('../../controllers/api/campaignController');
const { getAllCampaigns, getCampaignById, updateCampaign, deleteCampaign } = require('../../controllers/api/campaigns');

// Route to create a new campaign
router.post('/new', createCampaign);

// Route to get all campaigns
router.get('/', getAllCampaigns);

// Route to get a specific campaign by ID
router.get('/:id', getCampaignById);

// Route to update a campaign
router.put('/:id', updateCampaign);

// Route to delete a campaign
router.delete('/:id', deleteCampaign);

module.exports = router;
