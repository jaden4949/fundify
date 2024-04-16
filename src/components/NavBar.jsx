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
        <Link to="/create" className="App-link">Create Campaign</Link>
        <Link to="" onClick={handleLogOut}>Log Out</Link>
        {user ? "": <Link to="/signup" className="App-link">Sign-Up</Link>} 
        {user ? "": <Link to="/login" className="App-link">Login</Link>}
        {/* <span>Welcome {user.name}</span> */}
        {/* {user && <Link to="/profile" className="App-link">Profile</Link>}
        {user && <span>Welcome, {user.name}</span>}
        {!user && <Link to="/login" className="App-link">Login</Link>}
        {/* &nbsp;&nbsp;<span>Welcome, {user.name}</span> */}
      </div>
    </nav>
  );
 }