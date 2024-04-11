import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import SignUpForum CSS file for styling

class SignUpForum extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password!== this.state.confirm) {
      this.setState({ error: 'Passwords do not match' });
    } else {
      console.log('Forum submitted:', this.state);
      this.setState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
      });
    }
  };

  handleClose = () => {
    // Logic to close the sign-up form and navigate to the homepage
    console.log('Closing sign-up form');
    this.setState({
      name: '',
      email: '',
      password: '',
      confirm: '',
      error: ''
    });
    window.location.href = '/'; // Redirect to the home page
};


  render() {
    const disable = this.state.password!== this.state.confirm;
    return (
      <div className="signup-container">
        <div className="form-container">
          <button className="close-button" onClick={this.handleClose}>X</button>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>UserName</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm Password</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}

// export default withRouter(SignUpForum);
export default SignUpForum;