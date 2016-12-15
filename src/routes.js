'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import LandingPage from './components/LandingPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import StPageContainer from './components/StPageContainer';
import InstPageContainer from './components/InstPageContainer';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Route path="/">
    	<IndexRoute component={LandingPage}/>
    	<Route path="/" component={Layout}>
    		<Route path="search/:type" component={SearchPage}/>
		    <Route path="state/:name" component={StPageContainer}/>
		    <Route path="institution/:name" component={InstPageContainer}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;
