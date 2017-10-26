'use strict';

import React from 'react';
import NotFoundPage from './NotFoundPage';
import SectionNav from './SectionNav.jsx';
import ProfileSection from './ProfileSection';
import ProfileHeader from './ProfileHeader.jsx';
import DataBlock from './DataBlock';
import { indicatorTrendsSettings } from '../settings/indicatorTrendsSettings';
import { connect } from 'react-redux'
import { toggleTopNavProfileName, changeCurrProfileSection } from '../actions'
import $ from 'jquery';
import Footer from './Footer';
import {Helmet} from "react-helmet";


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
    console.log(this.props);
    
    if (!this.props.indicatorSettings) {
      return <NotFoundPage/>;
    }

    const {path, name, description, rankingVariables, section} = this.props.indicatorSettings;

    console.log(indicatorTrendsSettings[path].trendsSettings)

    let customSections = [{name:"About", dataDivision:"about"}]
    if (rankingVariables) { 
      customSections.push({name:"Rankings", dataDivision:"rankings"})
    }
    if (indicatorTrendsSettings[path] && indicatorTrendsSettings[path].trendsSettings) { 
      customSections.push({name:"Trends", dataDivision:"trends"}) 
    }

    return (
      <div className="location-profile indicator">
        <Helmet>
          <title>Higher Ed Index | {this.props.indicatorSettings.name}</title>
          <meta name="description" content="New America Higher Ed Index" />
          <meta name="twitter:card" content="New America Higher Ed Index" />
          <meta name="twitter:title" content={"Higher Ed Index: " + this.props.indicatorSettings.name} />
          <meta name="twitter:description" content="New America Higher Ed Index"/>
          <meta property="og:title" content={"Higher Ed Index: " + this.props.indicatorSettings.name} />
          <meta property="og:description" content="New America Higher Ed Index" />
        </Helmet>
        <ProfileHeader id={ this.props.indicatorSettings.path } name={ this.props.indicatorSettings.name }/>
        { customSections.length > 1 && <SectionNav type="indicators" customSections={customSections} /> }
        <ProfileSection
          title="About"
          index="0"
          type="description"
          text={description} />
        { rankingVariables && <ProfileSection 
          title="Rankings"
          index="1"
          type="rankingDashboard"
          settings={rankingVariables} 
          collectionName={"states_" + section} 
          data= {this.props.statesData} /> }
        { indicatorTrendsSettings[path] && indicatorTrendsSettings[path].trendsSettings && <ProfileSection
          title="Trends"
          index={rankingVariables ? "2" : "1"}
          settings={indicatorTrendsSettings[path].trendsSettings} 
          data= {this.props.usData} /> }
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
    },
    resetCurrProfileSection: () => {
      dispatch(changeCurrProfileSection('none'));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorPage)
