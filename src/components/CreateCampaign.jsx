import React, { useState } from 'react';
import { createCampaign } from '../utilities/campaigns-service'; // Assuming you have a function to create campaigns
import '../App.css'; // Import the CSS file

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare campaign data object
    const campaignData = {
      title,
      description,
      amount,
      photo
    };

    try {
      // Send campaign data to the server
      await createCampaign(campaignData);

      // Reset form fields
      setTitle('');
      setDescription('');
      setAmount(0);
      setPhoto(null);

      // Display success message
      setShowSuccessMessage(true);

      // Redirect to the main page after 2 seconds
      setTimeout(() => {
        window.location.href = '/'; // Redirect to the main page
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
      // Optionally, handle errors (e.g., display error message)
    }
  };

  const handleClose = () => {
    // Close the form and redirect to the home page
    window.location.href = '/';
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <button className="close-button" onClick={handleClose}>X</button>
        <h1 className="CreateCampaign-title">Create Campaign</h1>
        <form className="CreateCampaign-form" onSubmit={handleSubmit}>
          <label htmlFor="title" className="CreateCampaign-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="CreateCampaign-input"
          />
          <label htmlFor="description" className="CreateCampaign-label">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="CreateCampaign-input"
          />
          <label htmlFor="amount" className="CreateCampaign-label">
            Amount to be raised:
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="CreateCampaign-input"
          />
          <label htmlFor="photo" className="CreateCampaign-label">
            Photo:
          </label>
          <input
            type="file"
            id="photo"
            onChange={(event) => setPhoto(event.target.files[0])}
            className="CreateCampaign-input"
          />
          <button type="submit" className="CreateCampaign-button">
            Create Campaign
          </button>
        </form>
        {showSuccessMessage && <div className="CreateCampaign-success-message">Campaign created successfully!</div>}
      </div>
    </div>
  );
};

export default CreateCampaign;
