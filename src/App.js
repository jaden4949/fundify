import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateCampaign from './components/CreateCampaign';

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
            <Link
              to="/fundify"
              className="App-link"
            >
              Fundify
            </Link>
            <div className="App-nav-links"> {/* Container for the right-aligned buttons */}
              <Link
                to="/campaigns"
                className="App-link"
              >
                Browse Campaigns
              </Link>
              <Link
                to="/create"
                className="App-link"
              >
                Create Campaign
              </Link>
              <Link
                to="/login"
                className="App-link"
              >
                Login
              </Link>
              <Link
                to="../pages/AuthPage"
                className="App-link"
              >
                Sign-Up
              </Link>
            </div>
          </nav>
          <h1 className="App-title">Welcome to our crowdfunding platform!</h1>
        </header>
      </div>
    </Router>
  );
}

export default App;
