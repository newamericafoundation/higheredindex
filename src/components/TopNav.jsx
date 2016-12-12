'use strict';

import React from 'react';
import { Link } from 'react-router';

import ExpandableSearchBox from './ExpandableSearchBox.jsx'

export default function TopNav() {
	return (
    	<nav className="top-nav">
    		<div className="top-nav__title">
    			<Link to="/">
    				<h3 className="top-nav__title__primary">Ed-Index</h3>
    			</Link>
    			<h3 className="top-nav__title__secondary">by</h3>
    			<a href="https://www.newamerica.org">
    				<h3 className="top-nav__title__primary">New America</h3>
    			</a>
    		</div>
    		<ExpandableSearchBox />
    	</nav>
    );
}