'use strict';

import React from 'react';
import { Link } from 'react-router';
import TopNav from './TopNav.jsx';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="app-container">
        <header>
          <TopNav />
        </header>
        <div className="main-content with-header">{this.props.children}</div>
        <footer>
          <p>This is the Footer
          </p>
        </footer>
      </div>
    );
  }
}
