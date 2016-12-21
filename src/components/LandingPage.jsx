"use strict"

import React from 'react';
import SearchBox from './SearchBox.jsx';
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__content">
     	  <a href={'https://www.newamerica.org/'}>New America Logo</a>
      	<h1 className="landing-page__title">Ed-Index</h1>
      	<SearchBox />
      	<div className="landing-page__explore-links">
          <div className="landing-page__explore-link">
            <Link to={'/search/states'}>
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">States</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search/institutions'}>
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Institutions</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search/variables'}>
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Variables</h3>
            </Link>
          </div>
      	</div>
      </div>
    </div>
  )
}

export default LandingPage;