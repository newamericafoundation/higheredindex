'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import LandingPage from './components/LandingPage.jsx';
import SearchPage from './components/SearchPage.jsx';
import AthletePage from './components/AthletePage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Route path="/">
    	<IndexRoute component={LandingPage}/>
    	<Route path="/" component={Layout}>
    		<Route path="search/:type" component={SearchPage}/>
		    <Route path="athlete/:id" component={AthletePage}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;
