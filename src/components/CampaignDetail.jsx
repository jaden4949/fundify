import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg'; // Make sure you have this default image in your public folder

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const { campaignId } = useParams();

  const handleDonate = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: donationAmount }),
      });
      const updatedCampaign = await response.json();

      // Update your campaign state here
      setCampaign(prevCampaign => ({
        ...prevCampaign,
        raised: updatedCampaign.raised
      }));

      // Reset donation input
      setDonationAmount('');

      // Handle success (e.g., show a message, update UI)
      console.log('Donation successful:', updatedCampaign);

    } catch (error) {
      console.error('Error processing donation:', error);
      // Handle error (e.g., show error message)
    }
  };

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