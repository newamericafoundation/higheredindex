'use strict';

require('./static/scss/index.scss');

import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';

console.log("hello!!!!!! in app client")
console.log(process.env);
window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
