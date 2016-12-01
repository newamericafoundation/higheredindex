"use strict"

import React from 'react';
import SearchBox from './SearchBox.jsx';
import { Link } from 'react-router';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
     	<a href={'https://www.newamerica.org/'}>New America Logo</a>
      	<h1 className="landing-page__title">Ed-Index</h1>
      	<SearchBox />
      	<div>
      		<Link to={'/search/states'}>Explore States</Link>
      		<Link to={'/search/institutions'}>Explore Institutions</Link>
      		<Link to={'/search/variables'}>Explore Variables</Link>
      	</div>
      </div>
    );
  }
}