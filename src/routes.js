'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import SideMenuLayout from './components/SideMenuLayout';
import TopNavLayout from './components/TopNavLayout';
import LandingPage from './components/LandingPage.jsx';
import ListingsPage from './components/ListingsPage.jsx';
import StPageContainer from './components/StPageContainer';
import InstPageContainer from './components/InstPageContainer';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Route path="/" component={SideMenuLayout}>
    	<IndexRoute component={LandingPage}/>
    	<Route path="/" component={TopNavLayout}>
    		<Route path="search/" component={ListingsPage}/>
		    <Route path="state/:id" component={StPageContainer}/>
		    <Route path="institution/:id" component={InstPageContainer}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;
