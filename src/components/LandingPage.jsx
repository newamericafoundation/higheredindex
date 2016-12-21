"use strict"

import React from 'react';
import SearchBox from './SearchBox.jsx';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import SideMenu from './SideMenu';

class LandingPage extends React.Component {

  render() {
    let contentClasses = "main-content";
    contentClasses += this.props.contentShifted ? " shifted" : "";
    return (
      <div className="landing-page">
        <SideMenu />
        <div className={contentClasses}>
       	  <a href={'https://www.newamerica.org/'}>New America Logo</a>
        	<h1 className="landing-page__title">Ed-Index</h1>
        	<SearchBox />
        	<div className="landing-page__explore-links">
            <div className="landing-page__explore-link">
              <Link to={'/search/states'}>
                <h5 className="landing-page__explore-link__secondary">Explore</h5>
                <h3 className="landing-page__explore-link__primary">States</h3>
              </Link>
            </div>
            <div className="landing-page__explore-link">
              <Link to={'/search/institutions'}>
                <h5 className="landing-page__explore-link__secondary">Explore</h5>
                <h3 className="landing-page__explore-link__primary">Institutions</h3>
              </Link>
            </div>
            <div className="landing-page__explore-link">
              <Link to={'/search/variables'}>
                <h5 className="landing-page__explore-link__secondary">Explore</h5>
                <h3 className="landing-page__explore-link__primary">Variables</h3>
              </Link>
            </div>
        	</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contentShifted: state.menuExpanded
  }
}

export default connect(mapStateToProps)(LandingPage)