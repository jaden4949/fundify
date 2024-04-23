import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { getUser } from '../utilities/users-service';
import { getCampaignsByUser } from '../utilities/campaigns-service';

const UserCampaigns = () => {
  const [user, setUser] = useState(getUser());
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchCampaigns = async () => {
      if (user) {
        setUserId(user._id);
      } else {
        console.error('User is not logged in or userId is missing');
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  useEffect(() => {
    if (userId) {
      const fetchCampaigns = async () => {
        try {
          const res = await getCampaignsByUser(userId);
          setCampaigns(res);
        } catch (error) {
          console.error('Error fetching campaigns:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCampaigns();
    } else {
      console.error('No campaigns to render or userId is missing');
      setLoading(false);
    }
  }, [userId]);

  const renderCampaigns = () => {
    if (!userId || !campaigns.length) {
      console.log('No campaigns to render or userId is missing');
      return null;
    }

    const userCampaigns = campaigns.filter(campaign => campaign.creator === userId);

    return userCampaigns.map(campaign => (
      <div key={campaign._id} className="campaign-item">
        <h2 className="campaign-title">{campaign.title}</h2>
        <p className="campaign-description">{campaign.description}</p>
        <p className="campaign-goal">Goal: ${campaign.goal}</p>
        <p className="campaign-raised">Raised: ${campaign.raised}</p>
      </div>
    ));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="your-campaigns-title">Here are your campaigns</h1>  {/* Apply the CSS class here */}
      <div className="campaign-list">
        {renderCampaigns()}
      </div>
    </div>
  );
  
}

export default UserCampaigns;