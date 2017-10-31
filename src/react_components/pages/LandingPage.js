import React from 'react';
import { Link } from 'react-router';

import SearchBox from '../components/SearchBox';
import SvgIcon from '../components/SvgIcon'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__content">
     	  <a href={'https://www.newamerica.org/'}><SvgIcon name='new-america' /></a>
      	<div className="landing-page__title"><SvgIcon name='higher-ed-index' /></div>
      	<SearchBox filter="all" />
      	<div className="landing-page__explore-links">
          <div className="landing-page__explore-link">
            <Link to={'/search/#states'}>
              <SvgIcon name='state' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">States</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search/#institutions'}>
              <SvgIcon name='institution' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Institutions</h3>
            </Link>
          </div>
          <div className="landing-page__explore-link">
            <Link to={'/search/#indicators'}>
              <SvgIcon name='indicator' />
              <h5 className="landing-page__explore-link__secondary">Explore</h5>
              <h3 className="landing-page__explore-link__primary">Indicators</h3>
            </Link>
          </div>
      	</div>
        <div className="landing-page__methodology-links">
          <div className="landing-page__methodology-link">
            <Link to={'/download'}>
              <SvgIcon name='download' />
              <h5 className="landing-page__methodology-link__primary">Download Dataset</h5>
            </Link>
          </div>
          <div className="landing-page__methodology-link">
            <Link to={'/methodology'}>
              <SvgIcon name='trends' />
              <h5 className="landing-page__methodology-link__primary">Methodology</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;