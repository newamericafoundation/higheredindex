'use strict';

import React from 'react';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import { indicatorVizSettings } from './indicatorVizSettings';
import RankingsDashboard from '../chart_modules/RankingsDashboard';
import { connect } from 'react-redux'
import { toggleTopNavProfileName } from '../actions'
import $ from 'jquery';

class IndicatorPage extends React.Component {
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
    console.log(this.props);
    
    if (!this.props.indicatorData) {
      return <NotFoundPage/>;
    }
    // ad these to render return when ready
    // 
            // <ProfileSection title="About" />
        // <div className="location-profile__body-paragraph">
        //   <p>{ description }</p>
        // </div>

        // <ProfileSection title="Rankings" />
        // <RankingsDashboard filters={rankingVariables} />

        // <ProfileSection title="Trends" />

    const {path, name, description, rankingVariables} = this.props.indicatorData;
    return (
      <div className="location-profile indicator">
        <ProfileHeader id={ path } name={ name } />
        <SectionNav type="indicator"/>


      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorPage)
