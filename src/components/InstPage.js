'use strict';

import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav';
import ProfileSectionTitle from './ProfileSectionTitle';
import ProfileHeader from './ProfileHeader';
import DataBlock from './DataBlock';
import instVizSettings from './instVizSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName } from '../actions'
import $ from 'jquery';

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
    if (!this.props.instData) {
      return <NotFoundPage/>;
    }
    return (
      <div className="location-profile state" ref="stProfile">
        <ProfileHeader id={ this.props.instData.path } name={ this.props.instData.name }/>
        <SectionNav />
        <ProfileSectionTitle 
          title="Students" 
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"/>
        <div>
          {instVizSettings.students.map((settings, i) => {
            console.log(this.props.instData)
            console.log(i)
            return <DataBlock key={i} settings={settings} data={this.props.instData.students[0]} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(InstPage)
