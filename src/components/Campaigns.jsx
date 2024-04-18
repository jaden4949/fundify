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
        console.log("API Response:", response); // Existing log
        response.forEach(campaign => console.log(campaign.photo)); // Log each photo URL
        setCampaigns(response);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]);
      }
    }
  
    fetchAllCampaigns();
  }, []);
  
  return (
    <div className="campaigns">
      <h2>All Campaigns</h2>
      <div className="campaign-list">
        {campaigns && campaigns.length > 0 ? (
          campaigns.map(campaign => (
            <Link key={campaign._id} to={`/campaigns/${campaign._id}`}>
              <div>
              <img src={campaign.photo ? campaign.photo : defaultImage} alt={campaign.title} className="campaign-image" />
                <div>{campaign.title}</div>
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