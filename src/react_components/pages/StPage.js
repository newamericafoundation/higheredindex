import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { Helmet } from "react-helmet";
import $ from 'jquery';

import NotFoundPage from './NotFoundPage';
import SectionNav from '../components/SectionNav';
import ProfileSection from '../components/ProfileSection';
import ProfileHeader from '../components/ProfileHeader';
import Footer from '../components/Footer';
import stVizSettings from '../../settings/stVizSettings';
import { toggleTopNavProfileName, changeCurrProfileSection } from '../../actions';
import sectionSettings from '../../settings/sectionSettings.js';
import ComparePopup from "../components/ComparePopup";

class StPage extends React.Component {
  constructor() {
    console.log("RENDERINEFINEIFNIENFOKJNDFNEFINEIF")
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
    if (!this.props.stData) {
      return <NotFoundPage/>;
    }
    return (
      <div className="location-profile state" ref="stProfile">
        <Helmet>
            <title>Higher Ed Index | {this.props.stData.name}</title>
            <meta name="description" content="New America Higher Ed Index" />
            <meta name="twitter:card" content="New America Higher Ed Index" />
            <meta name="twitter:title" content={"Higher Ed Index: " + this.props.stData.name} />
            <meta name="twitter:description" content="New America Higher Ed Index"/>
            <meta property="og:title" content={"Higher Ed Index: " + this.props.stData.name} />
            <meta property="og:description" content="New America Higher Ed Index" />
        </Helmet>
        <ProfileHeader id={ this.props.stData.path } name={ this.props.stData.name }/>
        <SectionNav type="states" />
        { sectionSettings.states.map((section, i) => {
          let name = section.name;
          let data = this.props.stData[section.dataDivision];

          return (
            <ProfileSection
              key={name}
              title={name}
              index={i}
              subtitle={section.subtitle}
              settings={stVizSettings[name]}
              collectionName={"states_" + section.dataDivision}
              data= {data} 
              showLastUpdated={true} />
          )
        })}
        {this.props.comparePopupSettings &&
          <ComparePopup {...this.props.comparePopupSettings} />
        }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topNavProfileNameShown: state.topNavProfileNameShown,
    currProfileName: state.currProfile.name,
    comparePopupSettings: state.comparePopupSettings
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