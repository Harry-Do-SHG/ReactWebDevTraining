import React, { Component } from 'react';
import Card from './Card';
import styles from '../custom.css';

export class Post extends Component {
  static displayName = Post.name;

  constructor(props) {
    super(props);
    this.state = { posts: [], loading: true };
  }

  componentDidMount() {
    this.populateData();
  }

  renderPostsCards(posts) {
    return (
      <div className="postContainer">
        {posts.map(post => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    );
  }

  render() {
    const { posts, loading } = this.state;

    return (
      <div className={styles.container}>
        <h1 id="tabelLabel">Posts</h1>
        {loading ? (
          <p><em>Loading...</em></p>
        ) : (
          this.renderPostsCards(posts)
        )}
      </div>
    );
  }

  async populateData() {
    const response = await fetch('api/post');
    const data = await response.json();
    this.setState({ posts: data, loading: false });
  }
}
