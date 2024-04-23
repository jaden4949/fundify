import React, { useState, useEffect } from 'react';
import { getUser } from '../utilities/users-service'; // Ensure this import is correct
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getCampaignById } from '../utilities/campaigns-service';

const defaultImage = '/default-image.jpg';

const CampaignDetail = () => {
  const [user, setUser] = useState(getUser());
  const [campaign, setCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [editData, setEditData] = useState({ title: '', description: '', goal: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const { campaignId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Current User:', user); // Log to check the current user object
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId, user]); // Adding user as a dependency so we re-run this effect if user changes

  const fetchCampaign = async () => {
    try {
      const fetchedCampaign = await getCampaignById(campaignId);
      console.log('Fetched Campaign:', fetchedCampaign); // Log to check the fetched campaign details
      setCampaign(fetchedCampaign);
      setEditData({
        title: fetchedCampaign.title,
        description: fetchedCampaign.description,
        goal: fetchedCampaign.goal
      });
      console.log('Creator Check:', user?._id, fetchedCampaign.creatorId); // Log to check IDs match
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
    setIsEditing(false);  // Exit editing mode after update
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/campaigns/${campaignId}`);
      if (response.status === 200) {
        setShowDeleteSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (showDeleteSuccess) return <div className="deletion-success">Campaign successfully deleted. Redirecting...</div>;


  if (!campaign) return <div>Loading...</div>;

  // Adjust this condition to match the 'creator' field in your schema
  const isUserTheCreator = user && user._id === campaign.creator;

  return (
    <div className="campaign-detail">
      <h1>{isEditing? <input type="text" value={editData.title} onChange={e => setEditData({...editData, title: e.target.value })} /> : campaign.title}</h1>
      <img src={campaign.photo || defaultImage} alt={campaign.title} />
      <p>{isEditing? <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value })} /> : campaign.description}</p>
      <p>{isEditing? <input type="number" value={editData.goal} onChange={e => setEditData({...editData, goal: parseInt(e.target.value, 10) })} /> : `$${campaign.raised || 0} raised of $${campaign.goal}`}</p>
      <button onClick={handleDonate} disabled={!donationAmount || donationAmount < 1}>Donate ${donationAmount}</button>
      <input type="number" value={donationAmount} onChange={e => setDonationAmount(e.target.value)} />
      {isUserTheCreator && (
        <>
          {isEditing ? (
            <>
              <button onClick={handleUpdate}>Update Campaign</button>
              <button onClick={() => setIsEditing(false)}>Cancel Edit</button>
            </>
          ) : (
            <>
              <button onClick={toggleEdit}>Edit Campaign</button>
              <button onClick={handleDelete}>Delete Campaign</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CampaignDetail;