import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignUpForum from './components/SignUpForum';
import LoginForm from './components/LoginForm';
import { getUser } from './utilities/users-service';
import NavBar from './components/NavBar';
import CreateCampaign from './components/CreateCampaign';
import Account from './components/Account';
import Campaigns from './components/Campaigns';
import HomePage from './components/HomePage';
import CampaignDetail from './components/CampaignDetail';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar user={user} setUser={setUser} />
          <h1 className="App-title">Welcome to our crowdfunding platform!</h1>
        </header>
        <Routes>
          <Route path="/signup" element={<SignUpForum setUser={setUser} />} />
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/auth" element={<AuthPage setUser={setUser} />} />
          <Route path="/create" element={<CreateCampaign />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:campaignId" element={<CampaignDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
