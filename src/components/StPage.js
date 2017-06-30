'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import stVizSettings from './stVizSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName, changeCurrProfileSection } from '../actions';
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
        <SectionNav type="location" />
        <ProfileSection 
          title="Students" 
          index="0"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={stVizSettings.students} 
          data= {this.props.stData.students }/>
        
        <ProfileSection 
          title="Loans" 
          index="1"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={stVizSettings.loans} 
          data= {this.props.stData.loans }/>

        <ProfileSection 
          title="Grants" 
          index="2"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={stVizSettings.grants} 
          data= {this.props.stData.grants }/>
        
        <ProfileSection 
          title="Schools" 
          index="3"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={stVizSettings.schools} 
          data= {this.props.stData.schools }/>
        
        <ProfileSection 
          title="Outcomes" 
          index="4"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={stVizSettings.outcomes} 
          data= {this.props.stData.outcomes }/>
        
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
