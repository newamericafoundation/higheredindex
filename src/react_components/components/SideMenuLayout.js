import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { Helmet } from "react-helmet";

import TopNav from './TopNav';
import SideMenu from './SideMenu';
import { toggleMenuExpansion, setComparePopupSettings } from '../../actions'

class SideMenuLayout extends React.Component {
  render() {
    let contentClasses = "main-content";
    contentClasses += this.props.contentShifted ? " shifted" : "";

    let overlayClasses = "main-content__overlay";
    overlayClasses += this.props.contentShifted || this.props.popupVisible ? " visible" : "";

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
          <meta property="og:image" content="../static/img/school.jpg" />
        </Helmet>
        <SideMenu />

        <div className={contentClasses}>
          {this.props.children}
        </div>
        <div className={overlayClasses} onClick={() => {this.props.clearSidemenu(); this.props.hideComparePopup();}} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentShifted: state.menuExpanded,
    popupVisible: state.comparePopupSettings !== null
  }
}

const mapDispatchToProps = (dispatch) => { 
  return {
    clearSidemenu: () => {
      dispatch(toggleMenuExpansion(false))
    },
    hideComparePopup: () => {
      dispatch(setComparePopupSettings(null))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuLayout)