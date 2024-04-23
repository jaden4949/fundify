import sendRequest from "./send-request";
const BASE_URL = '/api/campaigns';

export async function createCampaign(campaignData) {
    console.log('---Frontend Campaign data being sent:', campaignData);

    return sendRequest(`${BASE_URL}/new`, 'POST', campaignData)
}

export async function getCampaigns(params = {}) {
    const query = new URLSearchParams(params).toString();
    return sendRequest(`${BASE_URL}?${query}`, 'GET');
}

export async function getCampaignById(campaignId) {
    return sendRequest(`${BASE_URL}/${campaignId}`);
}

export async function getCampaignsByUser(userId) {
    return sendRequest(`${BASE_URL}/user/${userId}`, 'GET');
  }

export async function donateToCampaign(campaignId, donationAmount) {
    // Ensure your sendRequest function correctly handles POST requests
    return sendRequest(`${BASE_URL}/${campaignId}/donate`, 'POST', { amount: donationAmount });
}