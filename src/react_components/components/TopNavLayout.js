import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import TopNav from './TopNav.jsx';
import Footer from './Footer';

class TopNavLayout extends React.Component {
  render() {
    return (
      <div>
        <TopNav />
        <div className="top-nav-shifted-content">{this.props.children}</div>
      </div>
    );
  }
}

export default TopNavLayout;