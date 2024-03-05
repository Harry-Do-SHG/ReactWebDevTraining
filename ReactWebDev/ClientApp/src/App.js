import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Post } from './components/Post';
import { NewPost } from './components/NewPost';
import { Login } from './components/Login';
import { NewAccount } from './components/NewAccount';
import AddFriend from './components/AddFriend';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/post' component={Post} />
        <Route path='/newpost' component={NewPost} />
        <Route path='/create-account' component={NewAccount} />
        <Route path='/friend' component={AddFriend} />
      </Layout>
    );
  }
}
