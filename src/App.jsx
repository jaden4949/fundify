import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage'; // Import AuthPage component
import SignUpForum from './components/SignUpForum'; // Import SignUpForum component
import { getUser } from './utilities/users-service';
import NavBar from './components/NavBar'; // Import NavBar component

function App() {
  const [user, setUser] = useState(getUser());

    return(
      <div className="App">
      <Router>
        <header className="App-header">
          <NavBar user={ user } setUser={ setUser }/>
          <h1 className="App-title">Welcome to our crowdfunding platform!</h1>
        </header>

        <Routes>
          <Route path="/signup" element={<SignUpForum setUser={setUser}/>} />
          <Route path="/auth" element={<AuthPage setUser={setUser}/>} />
          {/* Add other routes here */}
        </Routes>
      </Router>
      </div>
    )
}

export default App;