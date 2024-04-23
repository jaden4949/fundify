import React, { useState } from 'react';
import { createCampaign } from '../utilities/campaigns-service';
import '../App.css';

const CreateCampaign = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePhotoChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const campaignData = {
      title,
      description,
      goal,
      photo
    };

    try {
      await createCampaign(campaignData);

      setTitle('');
      setDescription('');
      setGoal(0);
      setPhoto(null);
      setShowSuccessMessage(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleClose = () => {
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
          <label htmlFor="goal" className="CreateCampaign-label">
            Amount to be raised:
          </label>
          <input
            type="number"
            id="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            className="CreateCampaign-input"
          />
          <label htmlFor="photo" className="CreateCampaign-label">
            Photo:
          </label>
          <input
            type="file"
            id="photo"
            onChange={handlePhotoChange}
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
