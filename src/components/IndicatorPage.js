'use strict';

import React from 'react';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import { indicatorTrendsSettings } from '../settings/indicatorTrendsSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName } from '../actions'
import $ from 'jquery';
import Footer from './Footer';


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
    
    if (!this.props.indicatorSettings) {
      return <NotFoundPage/>;
    }

    const {path, name, description, rankingVariables, section} = this.props.indicatorSettings;

    console.log(indicatorTrendsSettings[path].trendsSettings)
    console.log(this.props.indicatorData)

    let usData;

    this.props.indicatorData.forEach((d) => {
      if (d.state === "US") {
        usData = d;
        return;
      }
    });

    console.log(usData)
    
    console.log(this.props.indicatorSettings)
    return (
      <div className="location-profile indicator">
        <ProfileHeader id={ this.props.indicatorSettings.path } name={ this.props.indicatorSettings.name }/>
        <SectionNav type="indicators" />
         <ProfileSection
          title="About"
          index="0"
          type="description"
          text={description} />
        <ProfileSection 
          title="Rankings"
          index="1"
          type="rankingDashboard"
          settings={rankingVariables} 
          collectionName={"states_" + section} 
          data= {this.props.indicatorData} />
        <ProfileSection
          title="Trends"
          index="2"
          subtitle="Student data is collected from the Integrated Postsecondary Education Data System (IPEDS)"
          settings={indicatorTrendsSettings[path].trendsSettings} 
          collectionName={"states_" + section}
          data= {usData} />
        <Footer />
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
