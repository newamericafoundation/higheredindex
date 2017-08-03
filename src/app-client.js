'use strict';

require('./static/scss/index.scss');
if (!global._babelPolyfill) {
   require('babel-polyfill');
}
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
