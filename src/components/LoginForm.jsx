import { useState } from 'react';
import * as usersService from '../utilities/users-service';
import '../App.css';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    name: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const loggedInUser = await usersService.login(credentials);
      // Redirect to the homepage after successful login
      window.location.href = '/'; // Replace '/' with the URL of your homepage
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  function handleCloseForm() {
    // Redirect to the homepage
    window.location.href = '/'; // Replace '/' with the URL of your homepage
  }

  return (
    <div className="signup-container">
      <div className="form-container">
        <button className="close-button" onClick={handleCloseForm}>X</button>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" name="name" value={credentials.name} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
