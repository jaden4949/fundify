import React, { Component } from 'react';
import { signUp } from '../utilities/users-service';

class SignUpForum extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: '',
    formVisible: true // Add formVisible state
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.password !== this.state.confirm) {
      this.setState({ error: 'Passwords do not match' });
    } else {
      const user = await signUp({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });
      this.props.setUser(user);
      // Close the form after successful sign-up
      this.setState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
        formVisible: false
      });
    }
  };

  handleClose = () => {
    // Close the form without signing up
    this.setState({
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: '',
      formVisible: false
    });
  };

  render() {
    const { formVisible, name, email, password, confirm, error } = this.state;
    const disable = password !== confirm;

    // Render the form only if formVisible is true
    return formVisible ? (
      <div className="signup-container">
        <div className="form-container">
          <button className="close-button" onClick={this.handleClose}>X</button>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>UserName</label>
            <input type="text" name="name" value={name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} required />
            <label>Confirm Password</label>
            <input type="password" name="confirm" value={confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    ) : null; // Render nothing if formVisible is false
  }
}

export default SignUpForum;
