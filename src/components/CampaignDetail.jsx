import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById, donateToCampaign } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg'; // Make sure you have this default image in your public folder

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const { campaignId } = useParams();

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const fetchedCampaign = await getCampaignById(campaignId);
        setCampaign(fetchedCampaign);
      } catch (error) {
        console.error('Error fetching campaign details:', error);
      }
    }

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const handleDonate = async (donationAmount) => {
    try {
      const updatedCampaign = await donateToCampaign(campaign._id, donationAmount);
      setCampaign(updatedCampaign); // Update the campaign state with the new raised amount
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  };
  
  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-detail">
      <h1>{campaign.title}</h1>
      <img src={campaign.photo || defaultImage} alt={campaign.title} />
      <p>{campaign.description}</p>
      {/* Display the raised amount and the goal */}
      <p>${campaign.raised} raised of ${campaign.goal}</p> 
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Enter donation amount"
      />
      <button onClick={handleDonate}>Donate</button>
      {/* Display donation history here */}
      {/* ... */}
    </div>
  );
};

export default CampaignDetail;
