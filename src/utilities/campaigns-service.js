import sendRequest from "./send-request";
const BASE_URL = '/api/campaigns';

export async function createCampaign(campaignData) {
    console.log('---Frontend Campaign data being sent:', campaignData);

    return sendRequest(`${BASE_URL}/new`, 'POST', campaignData)
}

export async function getCampaigns() {
    return sendRequest(BASE_URL, 'GET');
}

