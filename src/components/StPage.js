'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSectionTitle from './ProfileSectionTitle.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import stVizSettings from './stVizSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName } from '../actions'
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
        <ProfileSectionTitle 
          title="Students" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {stVizSettings.students.map((settings, i) => {
            return <DataBlock key={i} settings={settings} data={this.props.stData.students} />;
          })}
        </div>
        <ProfileSectionTitle 
          title="Loans" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {stVizSettings.loans.map((settings, i) => {
            return <DataBlock key={i} settings={settings} data={this.props.stData.loans} />;
          })}
        </div>
        <ProfileSectionTitle 
          title="Grants" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {stVizSettings.grants.map((settings, i) => {
            return <DataBlock key={i} settings={settings} data={this.props.stData.grants} />;
          })}
        </div>
        <ProfileSectionTitle 
          title="Schools" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {stVizSettings.schools.map((settings, i) => {
            return <DataBlock key={i} settings={settings} data={this.props.stData.schools} />;
          })}
        </div>
        <ProfileSectionTitle 
          title="Outcomes" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {stVizSettings.outcomes.map((settings, i) => {
            return <DataBlock key={i} settings={settings} data={this.props.stData.outcomes} />;
          })}
        </div>
        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
        
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StPage)
