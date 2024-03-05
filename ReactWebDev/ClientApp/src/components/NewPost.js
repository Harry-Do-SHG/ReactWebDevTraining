import React, { Component } from 'react';
import styles from '../custom.css';

export class NewPost extends Component {
  static displayName = NewPost.name;

  constructor(props) {
    super(props);
    this.state = { title: '', content: '', username:'', submissionMessage: '' };
  }

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  }

  handleContentChange = (e) => {
    this.setState({ content: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content
      })
    });

    if (response.ok) {
      // Post created successfully
      this.setState({ submissionMessage: 'Post created successfully' });
    } else {
      // Handle error
      const errorMessage = await response.text();
      this.setState({ submissionMessage: `Error: ${errorMessage}` });
    }
  }

  render() {
    const { title, content, username, submissionMessage } = this.state;
    return (
      <div className={styles.container}> {/* Use CSS module class */}
        <h1>Create New Post</h1>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.formGroup}> {/* Use CSS module class */}
            <label>Username:</label>
            <input type="text" value={username} onChange={this.handleUsernameChange} />
          </div>
          <div className={styles.formGroup}> {/* Use CSS module class */}
            <label>Title:</label>
            <input type="text" value={title} onChange={this.handleTitleChange} />
          </div>
          <div className={styles.formGroup}> {/* Use CSS module class */}
            <label>Content:</label>
            <textarea value={content} onChange={this.handleContentChange} />
          </div>
          <button type="submit" className={styles.button}>Submit</button> {/* Use CSS module class */}
        </form>
        {submissionMessage && <label className={styles.error}>{submissionMessage}</label>} {/* Use CSS module class */}
      </div>
    );
  }
}
