import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCampaigns } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchAllCampaigns() {
      try {
        const response = await getCampaigns({ limit: 5 });
        setCampaigns(response);
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
        {campaigns.length > 0? (
          campaigns.map((campaign) => (
            <Link key={campaign._id} to={`/campaigns/${campaign._id}`}>
              <div className="campaign-card">
                <img
                  src={campaign.photo || defaultImage}
                  alt={campaign.title}
                  className="campaign-image"
                />
                <div className="campaign-details">
                  <h3 className="campaign-title">{campaign.title}</h3>
                  <p className="campaign-description">{campaign.description}</p>
                  <div className="campaign-funding">
                    <p>${campaign.raised || 0} raised </p>
                    <p className="funding-goal">Goal: ${campaign.goal}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No campaigns found</p>
        )}
      </div>
    </div>
  );
};

export default Campaigns;