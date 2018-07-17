import _ from 'lodash';
import React, { Component } from 'react';

export default class ListView extends Component {
  render() {
    return (
      <ul>
        {this.props.rowsIdArray.map(each => {
          return this.renderRowById(each);
        })}
      </ul>
    );
  }

  renderRowById(rowId) {
    return (
      <li key={rowId}>
        {this.props.renderRow(rowId, _.get(this.props.rowsById, rowId))}
      </li>
    )
  }
}