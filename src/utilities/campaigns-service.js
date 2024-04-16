import sendRequest from "./send-request";
const BASE_URL = '/api/campaigns';

export async function createCampaign(campaignData) {
    return sendRequest(`${BASE_URL}/new`, 'POST', campaignData)
}