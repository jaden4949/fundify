import sendRequest from "./send-request";
const BASE_URL = '/api/campaigns';

export async function createCampaign(campaignData) {
    console.log('---Frontend Campaign data being sent:', campaignData);

    return sendRequest(`${BASE_URL}/new`, 'POST', campaignData)
}

export async function getCampaigns() {
    return sendRequest(BASE_URL, 'GET');
}

// In campaigns-service.js
export async function getCampaignById(campaignId) {
    return sendRequest(`${BASE_URL}/${campaignId}`);
  }
  
  // In campaigns-service.js
// campaigns-service.js
export async function donateToCampaign(campaignId, donationAmount) {
    // Ensure your sendRequest function correctly handles POST requests
    return sendRequest(`${BASE_URL}/${campaignId}/donate`, 'POST', { amount: donationAmount });
  }
  