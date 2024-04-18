import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCampaigns } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg'; // Path to the default image

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchAllCampaigns() {
      try {
        const response = await getCampaigns();
        console.log("API Response:", response); // Log the response to check structure
        setCampaigns(response); // Assuming response is the array of campaigns directly
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      }
    }

    fetchAllCampaigns();
  }, []);

  return (
    <div className="App">
      {/*... other components like.App-header,.App-nav etc.... */}

      <div className="campaign-grid">
        {campaigns.length > 0? campaigns.map(campaign => (
          <Link key={campaign._id} to={`/campaigns/${campaign._id}`}>
            <div className="campaign-card">
              <img src={campaign.photo || defaultImage} alt={campaign.title} className="campaign-image" />
              <div className="campaign-details">
                <h3 className="campaign-title">{campaign.title}</h3>
                <p className="campaign-description">{campaign.description}</p>
                <div className="campaign-funding">
                  <p className="amount-raised">${campaign.goal} raised</p>
                  <p className="funding-goal">Goal: ${campaign.amount}</p>
                </div>
              </div>
            </div>
          </Link>
        )) : <p>No campaigns found</p>}
      </div>
    </div>
  );
};

export default Campaigns;