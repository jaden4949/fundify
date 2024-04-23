import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getCampaignById } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg';

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [editData, setEditData] = useState({ title: '', description: '', goal: 0 });
  const { campaignId } = useParams();

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      const fetchedCampaign = await getCampaignById(campaignId);
      setCampaign(fetchedCampaign);
      setEditData({
        title: fetchedCampaign.title,
        description: fetchedCampaign.description,
        goal: fetchedCampaign.goal
      });
    } catch (error) {
      console.error('Error fetching campaign details:', error);
    }
  };

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
      setCampaign(prevCampaign => ({
        ...prevCampaign,
        raised: updatedCampaign.raised
      }));
      setDonationAmount('');
      console.log('Donation successful:', updatedCampaign);
    } catch (error) {
      console.error('Error processing donation:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/campaigns/${campaignId}`, editData);
      if (response.status === 200) {
        fetchCampaign();
        console.log('Update successful:', response.data);
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/campaigns/${campaignId}`);
      if (response.status === 200) {
        console.log('Campaign deleted successfully');
        // Implement redirection or UI update
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="campaign-detail">
      <h1>{editData.title}</h1>
      <img src={campaign.photo || defaultImage} alt={editData.title} />
      <p>{editData.description}</p>
      <p>${campaign.raised || 0} raised of ${editData.goal}</p>
      <input
        type="text"
        value={editData.title}
        onChange={e => setEditData({ ...editData, title: e.target.value })}
        placeholder="Edit Title"
      />
      <textarea
        value={editData.description}
        onChange={e => setEditData({ ...editData, description: e.target.value })}
        placeholder="Edit Description"
      />
      <input
        type="number"
        value={editData.goal}
        onChange={e => setEditData({ ...editData, goal: parseInt(e.target.value, 10) })}
        placeholder="Edit Goal"
      />
      <input
        type="number"
        value={donationAmount}
        onChange={e => setDonationAmount(e.target.value)}
        placeholder="Enter Donation Amount"
      />
      <button onClick={handleDonate}>Donate</button>
      <button onClick={handleUpdate}>Update Campaign</button>
      <button onClick={handleDelete}>Delete Campaign</button>
    </div>
  );
};

export default CampaignDetail;
