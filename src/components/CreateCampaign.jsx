import React, { useState } from 'react';
import { createCampaign } from '../utilities/campaigns-service.js';

function CreateCampaign() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State to control success message visibility

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
    } catch (error) {
      console.error('Error creating campaign:', error);
      // Optionally, handle errors (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Create Campaign</h1>
      <form onSubmit={handleSubmit}> {/* Corrected typo: forum to form */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Amount to be raised:
          <input
            type="number"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label>
          Photo:
          <input
            type="file"
            onChange={(event) => setPhoto(event.target.files[0])}
          />
        </label>
        <button type="submit">Create Campaign</button>
      </form>
      {showSuccessMessage && <div>Campaign created successfully!</div>} {/* Display success message */}
    </div>
  );
}

export default CreateCampaign;
