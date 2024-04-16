import { useState } from 'react';
import * as usersService from '../utilities/users-service';
import '../App.css';

export default function LoginForm({ setUser }) {
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
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the login service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
    }
  }

  return (
    <div>
      {/* <div className="LoginForm-container"></div> need to figure out why this isnt working */}
      <div className="form-container">
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