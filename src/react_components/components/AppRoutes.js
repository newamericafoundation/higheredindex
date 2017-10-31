import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import routes from '../../routes';
import store from '../../store';

const AppRoutes = () => (
	<Provider store={ store }>
  		<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
	</Provider>
);

export default AppRoutes;