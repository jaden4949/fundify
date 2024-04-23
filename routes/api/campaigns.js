const express = require('express');
const router = express.Router();
const authenticateToken = require('../../config/checkToken');
const Campaign = require('../../models/campaign');
const {
  createCampaign,
  getAllCampaigns,
  updateCampaign,
  deleteCampaign,
  processDonation,
  getCampaignsByUserId
} = require('../../controllers/api/campaigns');

router.post('/new', createCampaign);

router.get('/', getAllCampaigns);

router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).send('Campaign not found');
    }
    res.send(campaign);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/user/:userId', authenticateToken, getCampaignsByUserId);

router.put('/:id', updateCampaign);

router.delete('/:id', deleteCampaign);

router.post('/:id/donate', processDonation);

module.exports = router;