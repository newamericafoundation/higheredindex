'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router';
import AdminHome from './admin_components/AdminHome';
import AdminDataUpload from './admin_components/AdminDataUpload';
import AdminMethodology from './admin_components/AdminMethodology';
import AdminLogin from './admin_components/AdminLogin';
import AdminIndicatorEditor from './admin_components/AdminIndicatorEditor';
import SideMenuLayout from './components/SideMenuLayout';
import TopNavLayout from './components/TopNavLayout';
import LandingPage from './components/LandingPage.jsx';
import ListingsPage from './components/ListingsPage.jsx';
import StPageContainer from './components/StPageContainer';
import InstPageContainer from './components/InstPageContainer';
import IndicatorPageContainer from './components/IndicatorPageContainer';
import DownloadHomePage from './components/DownloadHomePage';
import MethodologyPage from './components/MethodologyPage';
import NotFoundPage from './components/NotFoundPage';
import store from './store';

const loggedIn = (state) => {
	console.log("HERE IS THE STETE", store)
	return 
  // ...
}

const requireAuth = (nextState, replace) => {
	console.log(store.getState())
  if (!store.getState().adminLoginStatus) {
  	console.log("redirecting")
    replace({
      pathname: '/admin/login'
    })
  } else {
  	console.log("staying")
  	return;
  }
}

const routes = (
	<Route path="/" component={SideMenuLayout}>
    	<IndexRoute component={LandingPage}/>
    	<Route path="/" component={TopNavLayout}>
    		<Route path="search" component={ListingsPage}/>
		    <Route path="state/:id" component={StPageContainer}/>
		    <Route path="institution/:id" component={InstPageContainer}/>
		    <Route path="indicator/:id" component={IndicatorPageContainer}/>
		    <Route path="download" component={DownloadHomePage}/>
		    <Route path="methodology" component={MethodologyPage}/>
		    <Route path="admin" component={AdminHome} onEnter={requireAuth}/>
		    <Route path="admin/login" component={AdminLogin} />
		    <Route path="admin/data-upload" component={AdminDataUpload} onEnter={requireAuth}/>
		    <Route path="admin/methodology" component={AdminMethodology} onEnter={requireAuth}/>
		    <Route path="admin/indicators/:id" component={AdminIndicatorEditor} onEnter={requireAuth}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;
