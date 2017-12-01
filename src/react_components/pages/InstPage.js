import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import {Helmet} from "react-helmet";
import $ from 'jquery';

import NotFoundPage from './NotFoundPage';
import SectionNav from '../components/SectionNav';
import ProfileSection from '../components/ProfileSection';
import ProfileHeader from '../components/ProfileHeader';
import DataBlock from '../components/DataBlock';
import Footer from '../components/Footer';
import instVizSettings from '../../settings/instVizSettings';
import { toggleTopNavProfileName, changeCurrProfileSection } from '../../actions';
import sectionSettings from '../../settings/sectionSettings.js';

class InstPage extends React.Component {
  constructor() {
    super();
    this.handlerFunc = this.handleScroll.bind(this);
  }
  componentDidMount() {
    $(".app-container").scroll(this.handlerFunc);

    let anchor = window.location.hash;

    if (anchor) {
      $(".app-container").animate(
        {'scrollTop':$(anchor).offset().top},
        500
      );
    }
  }

  componentWillUnmount() {
    $(".app-container").off("scroll", this.handlerFunc);
    this.props.resetCurrProfileSection();
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
        <Helmet>
          <title>Higher Ed Index | {this.props.instData.name}</title>
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
              data= {this.props.instData[section.dataDivision] }
              showLastUpdated={true} />
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