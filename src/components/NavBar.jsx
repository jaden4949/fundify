import React from 'react';
import { Link } from 'react-router-dom';
import * as userService from '../utilities/users-service';
import FundifyLogo from '../Fundify2.png';

const navbarOffsetTop = '0px';

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
      userService.logOut();
      setUser(null);
    }

  return (
    <nav
      className="App-nav"
      style={{ top: navbarOffsetTop }}
    >
      <Link to="/" className="App-link">
        <img src={FundifyLogo} alt="Fundify" className="logo" style={{ width: '100px', height: 'auto' }} />
      </Link>
      <div className="App-nav-links">
        <Link to="/campaigns" className="App-link">Browse Campaigns</Link>
        {user && <Link to="/create" className="App-link">Create Campaign</Link>}
        {user && <Link to="/account" className="App-link">My Account</Link>}
        {user? (
          <button onClick={handleLogOut} className="App-link log-out-button"><b>Log Out</b></button>
        ) : (
          <>
            <Link to="/signup" className="App-link">Sign-Up</Link>
            <Link to="/login" className="App-link">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}