'use strict';

import React from 'react';
import { Link } from 'react-router';

export default class StatePreview extends React.Component {
  render() {
    return (
      <Link to={`/state/${this.props.id}`}>
        <div className="state-preview">
          <h2 className="name">{this.props.name}</h2>
        </div>
      </Link>
    );
  }
}
