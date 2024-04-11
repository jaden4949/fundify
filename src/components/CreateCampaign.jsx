import React, { useState } from 'react';

function CreateCampaign() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Handle form submission here
    //...

    // Reset form fields
    setTitle('');
    setDescription('');
    setAmount(0);
    setPhoto(null);
  };

  return (
    <div>
      <h1>Create Campaign</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default CreateCampaign;