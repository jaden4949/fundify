import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CreateCampaign from './components/CreateCampaign';
import FundifyLogo from './Fundify2.png'; // Import the Fundify logo
import AuthPage from './pages/AuthPage'; // Import AuthPage component
import SignUpForum from './components/SignUpForum'; // Import SignUpForum component

function App() {
  const [navbarOffsetTop, setNavbarOffsetTop] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const navbar = document.querySelector('.App-nav');
    setNavbarOffsetTop(navbar.offsetTop);
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav
            className="App-nav"
            style={{ top: navbarOffsetTop }}
          >
            <Link to="/" className="App-link">
              <img src={FundifyLogo} alt="Fundify" className="logo" style={{ width: '100px', height: 'auto' }} />
            </Link>
            <div className="App-nav-links">
              <Link to="/campaigns" className="App-link">Browse Campaigns</Link>
              <Link to="/create" className="App-link">Create Campaign</Link>
              <Link to="/login" className="App-link">Login</Link>
              <Link to="/signup" className="App-link">Sign-Up</Link>
            </div>
          </nav>
          <h1 className="App-title">Welcome to our crowdfunding platform!</h1>
        </header>

        <Routes>
          <Route path="/signup" element={<SignUpForum />} />
          <Route path="/auth" element={<AuthPage />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
