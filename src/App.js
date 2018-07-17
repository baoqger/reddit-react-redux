import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as topicsSelectors from './store/topics/reducer';
import TopicScreen from './containers/TopicScreen/TopicsScreen.js';
import PostsScreen from './containers/PostScreen/PostsScreen.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {!this.props.isSelectionFinalized ?
          <TopicScreen /> :
          <PostsScreen />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSelectionFinalized: topicsSelectors.isTopicSelectionFinalized(state)
  };
}

export default connect(mapStateToProps)(App);