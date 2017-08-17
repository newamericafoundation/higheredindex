'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import Footer from './Footer';
import stVizSettings from '../settings/stVizSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName, changeCurrProfileSection } from '../actions';
import sectionSettings from '../settings/sectionSettings.js';
import $ from 'jquery';

class StPage extends React.Component {
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
    if (!this.props.stData) {
      return <NotFoundPage/>;
    }
    return (
      <div className="location-profile state" ref="stProfile">
        <ProfileHeader id={ this.props.stData.path } name={ this.props.stData.name }/>
        <SectionNav type="states" />
        { sectionSettings.states.map((section, i) => {
          let name = section.name;

          console.log(this.props.stData)

          // let data = section.dataDivision == "schools" ? this.props.stData["schools"].all : this.props.stData[section.dataDivision];
          let data = this.props.stData[section.dataDivision];
          return (
            <ProfileSection
              key={name}
              title={name}
              index={i}
              subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
              settings={stVizSettings[name]}
              collectionName={"states_" + section.dataDivision}
              data= {data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(StPage)
