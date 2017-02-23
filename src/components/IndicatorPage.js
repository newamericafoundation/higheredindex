'use strict';

import React from 'react';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSectionTitle from './ProfileSectionTitle.jsx';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import indicatorVizSettings from './indicatorVizSettings';
import RankingsDashboard from '../chart_modules/RankingsDashboard';
import { connect } from 'react-redux'
import { toggleTopNavProfileName } from '../actions'
import $ from 'jquery';

class IndicatorPage extends React.Component {
  constructor() {
    super();
    // this.handlerFunc = this.handleScroll.bind(this);
  }
  componentDidMount() {
    // $(".app-container").scroll(this.handlerFunc);
  }

  componentWillUnmount() {
    // $(".app-container").off("scroll", this.handlerFunc);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // return this.props.currProfileName === nextProps.currProfileName ? false : true;
  }

  handleScroll(event) {
    // const {topNavProfileNameShown, toggleTopNavProfileDisplay} = this.props;

    // if (!topNavProfileNameShown) {
    //     if ($(".profile-header__text").offset().top < 30) {
    //         toggleTopNavProfileDisplay(true)
    //     }
    // } else {
    //     if ($(".profile-header__text").offset().top >= 30) {
    //         toggleTopNavProfileDisplay(false)
    //     }
    // }
  }

  render() {
    console.log(this.props);
    
    if (!this.props.settings) {
      return <NotFoundPage/>;
    }
    const {id, title, image, description, filters} = this.props.settings;
    return (
      <div className="location-profile indicator">
        <ProfileHeader id={ id } name={ title } customImage={image}/>
        <SectionNav type="indicator"/>

        <ProfileSectionTitle title="About" />
        <div className="location-profile__body-paragraph">
          <p>{ description }</p>
        </div>

        <ProfileSectionTitle title="Rankings" />
        <RankingsDashboard filters={filters} />

        <ProfileSectionTitle title="Trends" />
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
