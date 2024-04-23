import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function UserCampaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Assume this is a secure endpoint to get the logged-in user's profile
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Make sure you're accessing the correct property from the response
                setUserId(response.data.id); // The field name here must match the one sent from your backend
                console.log('User ID:', response.data.id); // This should no longer be undefined
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        

        fetchUserData();
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchCampaigns = async () => {
            try {
                const res = await axios.get('/api/campaigns'); // Endpoint to fetch all campaigns
                setCampaigns(res.data);
                console.log('Campaigns:', res.data); // Debugging line
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
            setLoading(false);
        };

        if (userId) {
            fetchCampaigns();
        }
    }, [userId]);

    const renderCampaigns = () => {
        // Make sure we have both a userId and campaigns before trying to render them
        if (!userId || !campaigns.length) {
            console.log('No campaigns to render or userId is missing');
            return null;
        }

        // Filter campaigns where the campaign creator ID matches the logged-in user's ID
        const userCampaigns = campaigns.filter(campaign => campaign.creator === userId);
        console.log('Filtered Campaigns:', userCampaigns); // Debugging line

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
            <h1>Your Campaigns</h1>
            <div className="campaign-list">
                {renderCampaigns()}
            </div>
        </div>
    );
}

export default UserCampaigns;
