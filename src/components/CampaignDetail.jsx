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

  const handleDonate = async () => {
const updatedCampaign = await donateToCampaign(campaignId, { amount: parseFloat(donationAmount) });
// ...

    try {
      // Replace `donationAmount` with the actual amount being donated
      const response = await donateToCampaign(campaignId, { amount: parseFloat(donationAmount) });
      console.log('Updated campaign received:', response.data);
  
      // Update your campaign state here
      setCampaign(prevCampaign => ({
        ...prevCampaign,
        raised: response.data.raised
      }));
  
      // Reset donation input
      setDonationAmount('');
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
      <p>${campaign.raised || 0} raised of ${campaign.goal}</p>

      <input
        type="number"
        value={donationAmount}
        onChange={e => setDonationAmount(e.target.value)}
        placeholder="Enter Donation Amount"
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default CampaignDetail;