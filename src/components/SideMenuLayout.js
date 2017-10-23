import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import TopNav from './TopNav.jsx';
import SideMenu from './SideMenu';
import {Helmet} from "react-helmet";
import { toggleMenuExpansion } from '../actions'

class SideMenuLayout extends React.Component {
  render() {
    let contentClasses = "main-content";
    contentClasses += this.props.contentShifted ? " shifted" : "";
    return (
      <div className="app-container">
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Higher Ed Index</title>
          <link rel='shortcut icon' type='image/x-icon' href='https://s3-us-west-2.amazonaws.com/na-production-static/static/favicon.ico'/>
          <meta property="og:site_name" content="New America Higher Ed Index" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location} />
        </Helmet>
        <SideMenu />

        <div className={contentClasses}>
          {this.props.children}
        </div>
        <div className="main-content__overlay" onClick={this.props.clearSidemenu} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentShifted: state.menuExpanded
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    clearSidemenu: () => {
      console.log("clicked");
      dispatch(toggleMenuExpansion(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuLayout)