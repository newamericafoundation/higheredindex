'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router';
import AdminHome from './admin_components/AdminHome';
import AdminDataUpload from './admin_components/AdminDataUpload';
import AdminIndicatorEditor from './admin_components/AdminIndicatorEditor';
import SideMenuLayout from './components/SideMenuLayout';
import TopNavLayout from './components/TopNavLayout';
import LandingPage from './components/LandingPage.jsx';
import ListingsPage from './components/ListingsPage.jsx';
import StPageContainer from './components/StPageContainer';
import InstPageContainer from './components/InstPageContainer';
import IndicatorPageContainer from './components/IndicatorPageContainer';
import DownloadHomePage from './components/DownloadHomePage';
import NotFoundPage from './components/NotFoundPage';

const routes = (
	<Route path="/" component={SideMenuLayout}>
    	<IndexRoute component={LandingPage}/>
    	<Route path="/" component={TopNavLayout}>
    		<Route path="search" component={ListingsPage}/>
		    <Route path="state/:id" component={StPageContainer}/>
		    <Route path="institution/:id" component={InstPageContainer}/>
		    <Route path="indicator/:id" component={IndicatorPageContainer}/>
		    <Route path="download" component={DownloadHomePage}/>
		    <Route path="admin" component={AdminHome}/>
		    <Route path="admin/data-upload" component={AdminDataUpload}/>
		    <Route path="admin/indicators/:id" component={AdminIndicatorEditor}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;
