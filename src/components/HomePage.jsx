import React, { useState, useEffect } from 'react';
import { getCampaigns } from '../utilities/campaigns-service';

const HomePage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await getCampaigns();
        setCampaigns(response.data || []); // Use empty array as fallback if response.data is undefined
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <div>
      <h2>Recent Campaigns</h2>
      <ul>
        {campaigns && campaigns.map((campaign) => (
          <li key={campaign._id}>
            <h3>{campaign.title}</h3>
            <p>{campaign.description}</p>
            <p>Amount Raised: ${campaign.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
