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

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.currProfileName === nextProps.currProfileName ? false : true;
  }

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
    console.log(sectionSettings.institutions)
    if (!this.props.instData) {
      return <NotFoundPage/>;
    }
    return (
      <div className="location-profile state" ref="stProfile">
        <ProfileHeader id={ this.props.instData.path } name={ this.props.instData.name }/>
        <SectionNav type="institutions" />

        { sectionSettings.institutions.map((section, i) => {
          let name = section.name;

          return (
            <ProfileSection
              key={name}
              title={name}
              index={i}
              subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
              settings={instVizSettings[name]}
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
