import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from '../custom.css';


export class NewAccount extends Component {
  static displayName = NewAccount.name;

  constructor(props) {
    super(props);
    this.state = { username: "", password: "", submissionMessage: "" };
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    // Construct the URL with query parameters for username and password
    const url = `api/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    // Perform a GET request to the login endpoint
    const response = await fetch(url);

    if (response.ok) {
      const responseData = await response.json();
      let notExisted = true;
      for (const data of responseData){
        if (data.username === username) {
          this.setState({ submissionMessage: 'Username existed, Please choose another Username' });
          notExisted = false;
        }
      }
      if (notExisted) {
        const postResponse = await fetch('api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
        if (postResponse.ok) {
          this.setState({ submissionMessage: 'Accounte Created' });
        } else {
          const errorMessage = await postResponse.text();
          this.setState({ submissionMessage: `Error: ${errorMessage}` });
        }
      }
    } else {
      // Handle error
      const errorMessage = await response.text();
      this.setState({ submissionMessage: `Error: ${errorMessage}` });
    }
  }

  render() {
    const { username, password, submissionMessage } = this.state;
    return (
      <div className={styles.container}> {/* Use CSS module class */}
        <h1>Create an Account</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="formGroup"> {/* Use CSS module class */}
            <label>Username:</label>
            <input type="text" value={username} onChange={this.handleUsernameChange} required />
          </div>
          <div className="formGroup"> {/* Use CSS module class */}
            <label>Password:</label>
            <input type="text" value={password} onChange={this.handlePasswordChange} required />
          </div>
          <div className="formGroup"> {/* Use CSS module class */}
            <button type="submit" className={styles.button}>Create</button> {/* Use CSS module class */}
          </div>
            <Link to="/">Back to Login</Link> {/* Use CSS module class */}
        </form>
        {submissionMessage && <label className={styles.error}>{submissionMessage}</label>} {/* Use CSS module class */}
      </div>
    );
  }
}
