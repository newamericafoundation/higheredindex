"use strict"

import React from 'react';
import SearchBox from './SearchBox.jsx';
import { Link } from 'react-router';
import SvgIcon from './SvgIcon'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__content">
     	  <a href={'https://www.newamerica.org/'}><SvgIcon name='new-america' /></a>
      	<h1 className="landing-page__title">Ed-Index</h1>
      	<SearchBox />
      	<div className="landing-page__explore-links">
          <div className="landing-page__explore-link">
            <Link to={'/search#state'}>
              <SvgIcon name='map-marker' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">States</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search#institution'}>
              <SvgIcon name='institution' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Institutions</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search#indicator'}>
              <SvgIcon name='bar-chart' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Indicators</h3>
            </Link>
          </div>
      	</div>
        <div className="landing-page__methodology-links">
          <div className="landing-page__methodology-link">
            <Link to={'/'}>
              <SvgIcon name='download' />
              <h5 className="landing-page__methodology-link__primary">Download Dataset</h5>
            </Link>
          </div>
          <div className="landing-page__methodology-link">
            <Link to={'/'}>
              <SvgIcon name='line-chart' />
              <h5 className="landing-page__methodology-link__primary">Methodology</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;