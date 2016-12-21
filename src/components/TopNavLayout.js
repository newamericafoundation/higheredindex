import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import TopNav from './TopNav.jsx';
import SideMenu from './SideMenu';

class TopNavLayout extends React.Component {
  render() {
    // let contentClasses = "main-content";
    // contentClasses += this.props.contentShifted ? " shifted" : "";
    return (
      <div>
        <TopNav />
        <div className="top-nav-shifted-content">{this.props.children}</div>
      </div>
    );
  }
}

export default TopNavLayout;