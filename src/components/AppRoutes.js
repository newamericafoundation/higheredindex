'use strict';

import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router';
import routes from '../routes';
import rootReducer from '../reducers'

const loggerMiddleware = createLogger()

let store = createStore(
	rootReducer,
	applyMiddleware(
	    thunkMiddleware, // lets us dispatch() functions
	    loggerMiddleware // neat middleware that logs actions
	)
)

const AppRoutes = () => (
	<Provider store={ store }>
  		<Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
	</Provider>
);

// AppRoutes.propTypes = {
// 	store: PropTypes.object.isRequired,
// };

export default AppRoutes;