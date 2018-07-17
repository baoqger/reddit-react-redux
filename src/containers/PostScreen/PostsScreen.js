import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PostsScreen.css';
import * as postsAction from '../../store/posts/actions';
import * as postsSelectors from '../../store/posts/reducer';
import * as topicsSelectors from '../../store/topics/reducer';
import ListView from '../../components/ListView';
import ListRow from '../../components/ListRow';
import TopicFilter from '../../components/TopicFilter';
import PostView from '../../components/PostView';

class PostsScreen extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="PostsScreen">
        <div className="LeftPane">
          <TopicFilter
            className="TopicFilter"
            topics={this.props.topicsByUrl}
            selected={this.props.currentFilter}
            onChanged={this.onFilterChanged.bind(this)}
          />
          <ListView
           rowsIdArray={this.props.rowsIdArray}
           rowsById={this.props.rowsById}
           renderRow={this.renderRow.bind(this)} />
        </div>
        <div className="ContentPane">
          <PostView post={this.props.currentPost} />
        </div>
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loding...</p>
    );
  }

  renderRow(rowId, row) {
    return (
      <ListRow
        onClicks={this.onRowClick.bind(this)}
        rowId={rowId}>
        {!row.thumbnail ? false :
          <img className='thumbnail' src={row.thumbnail} />
        }
        <h3>{row.title}</h3>
      </ListRow>
    );
  }

  onFilterChanged(newFilter) {
    this.props.changeFilter(newFilter);
  }

  onRowClick(rowId) {
    this.props.selectPost(rowId);
  }
}

function mapStateToProps(state) {
  const [postsById, postsIdArray] = postsSelectors.getPosts(state);
  return {
    rowsById: postsById,
    rowsIdArray: postsIdArray,
    topicsByUrl: topicsSelectors.getSelectedTopicsByUrl(state),
    currentFilter: postsSelectors.getCurrentFilter(state),
    currentPost: postsSelectors.getCurrentPost(state)
  };
}

export default connect(mapStateToProps, postsAction)(PostsScreen);