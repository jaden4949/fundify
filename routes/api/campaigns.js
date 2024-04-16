const express = require('express');
const router = express.Router();
const { createCampaign } = require('../../controllers/api/campaignController');

// Route to create a new campaign
router.post('/new', createCampaign);

module.exports = router;
