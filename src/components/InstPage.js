'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import Footer from './Footer';
import instVizSettings from '../settings/instVizSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName, changeCurrProfileSection } from '../actions';
import $ from 'jquery';
import {Helmet} from "react-helmet";
import sectionSettings from '../settings/sectionSettings.js';

class InstPage extends React.Component {
  constructor() {
    super();
    this.handlerFunc = this.handleScroll.bind(this);
  }
  componentDidMount() {
    $(".app-container").scroll(this.handlerFunc);
  }

  componentWillUnmount() {
    $(".app-container").off("scroll", this.handlerFunc);
    this.props.resetCurrProfileSection();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("should component update: ", this.props.currProfileName, nextProps.currProfileName)
  //   return this.props.currProfileName === nextProps.currProfileName ? false : true;
  // }

  handleScroll(event) {
    const {topNavProfileNameShown, toggleTopNavProfileDisplay} = this.props;

    if (!topNavProfileNameShown) {
        if ($(".profile-header__text").offset().top < 30) {
            toggleTopNavProfileDisplay(true)
        }
    } else {
        if ($(".profile-header__text").offset().top >= 30) {
            toggleTopNavProfileDisplay(false)
        }
    }
  }

  render() {
    console.log("in inst render", this.props)
    if (!this.props.instData) {
      return <NotFoundPage/>;
    }
    return (
      <div className="location-profile state" ref="stProfile">
        <Helmet>
          <title>{this.props.instData.name}</title>
          <meta name="description" content="New America Higher Ed Index" />
          <meta name="twitter:card" content="New America Higher Ed Index" />
          <meta name="twitter:title" content={"Higher Ed Index: " + this.props.instData.name} />
          <meta name="twitter:description" content="New America Higher Ed Index"/>
          <meta property="og:title" content={"Higher Ed Index: " + this.props.instData.name} />
          <meta property="og:description" content="New America Higher Ed Index" />
        </Helmet>
        <ProfileHeader id={ this.props.instData.path } name={ this.props.instData.name }/>
        <SectionNav type="institutions" />

        { sectionSettings.institutions.map((section, i) => {
          let name = section.name;

          return (
            <ProfileSection
              key={name}
              title={name}
              index={i}
              subtitle={section.subtitle}
              settings={instVizSettings[name]}
              collectionName={"inst_" + section.dataDivision}
              data= {this.props.instData[section.dataDivision] }/>
          )
        })}
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topNavProfileNameShown: state.topNavProfileNameShown,
    currProfileName: state.currProfile.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTopNavProfileDisplay: (newSetting) => {
      dispatch(toggleTopNavProfileName(newSetting));
    }, 
    resetCurrProfileSection: () => {
      dispatch(changeCurrProfileSection('none'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstPage)
