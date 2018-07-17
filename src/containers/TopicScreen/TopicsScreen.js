import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TopicsScreen.css';
import * as topicsActions from '../../store/topics/actions';
import * as topicsSelectors from '../../store/topics/reducer';
import ListView from '../../components/ListView';
import ListRow from '../../components/ListRow';

class TopicsScreen extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  render() {
    if (!this.props.rowsById) return this.renderLoading();
    return (
      <div className="TopicsScreen">
        <ListView
          rowsIdArray={this.props.rowsIdArray}
          rowsById={this.props.rowsById}
          renderRow={this.renderRow.bind(this)} />
          {!this.props.canFinalizeSelection ? false :
            <button className="NextScreen" onClick={this.onNextScreenClick.bind(this)} >Next</button>
          }
      </div>
    );
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(rowId, row) {
    const selected = this.props.selectedIdsMap[rowId];
    return (
      <ListRow
        rowId={rowId}
        onClicks={this.onRowClick.bind(this)}
        selected={selected}>
        <h3>{row.title}</h3>
        <p>{row.description}</p>
      </ListRow>
    );
  }

  onRowClick(rowId) {
    this.props.selectTopic(rowId);
  }

  onNextScreenClick() {
    this.props.finalizeTopicSelection();
  }
}

function mapStateToProps(state) {
  return {
    rowsById: topicsSelectors.getTopicsByUrl(state),
    rowsIdArray: topicsSelectors.getTopicsUrlArray(state),
    selectedIdsMap: topicsSelectors.getSelectedTopicUrlsMap(state),
    canFinalizeSelection: topicsSelectors.isTopicSelectionValid(state),
  };
}

export default connect(mapStateToProps, topicsActions)(TopicsScreen);