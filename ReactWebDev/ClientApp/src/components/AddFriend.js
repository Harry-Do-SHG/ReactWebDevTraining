import React, { Component } from 'react';
import styles from '../custom.css';

export default class AddFriend extends Component {
  static displayName = AddFriend.name;

  constructor(props) {
    super(props);
    this.state = { username: 'Not Found', friendUserName: '', submissionMessage: '', users: [], userID: -1};
  }

  componentDidMount = async () => {
    const url = `api/login`;
    const userID = localStorage.getItem('token');
    const response = await fetch(url);
    this.setState({ userID: userID });
    if (response.ok) {
      const users = await response.json();
      this.setState({ users: users });
      for (const data of users) {
        if (data.id === parseInt(userID)) {
          this.setState({ username: data.username });
        }
      }
    } else {
      // Handle error
      const errorMessage = await response.text();
      this.setState({ submissionMessage: `Error: ${errorMessage}` });
    }
  }

  handleSelectChange = (e) => {
    this.setState({ friendUserName: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const userID = parseInt(this.state.userID);
    console.log("userID: ", typeof userID);
    console.log("friendname: ", this.state.friendUserName);
    const response = await fetch(`api/Login/friends/${userID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ friendname: this.state.friendUserName })
    });

    if (response.ok) {
      // Post created successfully
      this.setState({ submissionMessage: 'Friend added successfully' });
    } else {
      // Handle error
      const errorMessage = await response.text();
      this.setState({ submissionMessage: `Error: ${errorMessage}` });
    }
  }

  render() {
    const { username, submissionMessage, users, friendUserName } = this.state;
    return (
      <div className={styles.container}>
        <h1>Add Friend</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="formGroup">
            <div className="formGroup"> {/* Use CSS module class */}
              <label>Username:</label>
              <input type="text" value={username} readOnly />
            </div>
            <div className="formGroup"> {/* Use CSS module class */}
              <label>Select an Username:</label>
              <select value={friendUserName} onChange={(e) => this.handleSelectChange(e)}>
                {users.map((user, index) => (
                  <option key={index} value={user.username}>{user.username}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit">Add</button>
          <p>{submissionMessage}</p>
        </form>
      </div>
    );
  }
}
