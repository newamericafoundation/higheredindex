'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router';
import AdminHome from './react_components/admin_components/AdminHome';
import AdminDataUpload from './react_components/admin_components/AdminDataUpload';
import AdminCodebookUpload from './react_components/admin_components/AdminCodebookUpload';
import AdminMethodology from './react_components/admin_components/AdminMethodology';
import AdminLogin from './react_components/admin_components/AdminLogin';
import AdminIndicatorEditor from './react_components/admin_components/AdminIndicatorEditor';
import SideMenuLayout from './react_components/pages/SideMenuLayout';
import TopNavLayout from './react_components/pages/TopNavLayout';
import LandingPage from './react_components/pages/LandingPage';
import ListingsPage from './react_components/pages/ListingsPage';
import StPageContainer from './react_components/pages/StPageContainer';
import InstPageContainer from './react_components/pages/InstPageContainer';
import IndicatorPageContainer from './react_components/pages/IndicatorPageContainer';
import DownloadHomePage from './react_components/pages/DownloadHomePage';
import ApiDocsPage from './react_components/pages/ApiDocsPage';
import MethodologyPage from './react_components/pages/MethodologyPage';
import NotFoundPage from './react_components/pages/NotFoundPage';
import store from './store';


const requireAuth = (nextState, replace) => {
	if (!store.getState().adminLoginStatus) {
		replace({
			pathname: '/admin/login'
		})
	} else {
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
		    <Route path="api-documentation" component={ApiDocsPage}/>
		    <Route path="methodology" component={MethodologyPage}/>
		    <Route path="admin" component={AdminHome} onEnter={requireAuth}/>
		    <Route path="admin/login" component={AdminLogin} />
		    <Route path="admin/data-upload" component={AdminDataUpload} onEnter={requireAuth}/>
		    <Route path="admin/codebook-upload" component={AdminCodebookUpload} onEnter={requireAuth}/>
		    <Route path="admin/methodology" component={AdminMethodology} onEnter={requireAuth}/>
		    <Route path="admin/indicators/:id" component={AdminIndicatorEditor} onEnter={requireAuth}/>
		    <Route path="*" component={NotFoundPage}/>
		</Route>
  	</Route>
);

export default routes;