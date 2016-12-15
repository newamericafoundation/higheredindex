'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/test';

mongoose.connect(url);
const db = mongoose.connection;
db.on('error', (err) => {
  console.error(`Connection error: ${err}`);
  process.exit(1);
});
db.once('open', () => {
  console.log('Connected to MongoDB server.');
});

const stateSchema = new mongoose.Schema({
  id: Number,
  name: String,
  path: String,
  data_1999: Number,
  data_2000: Number,
  data_2001: Number,
  data_2002: Number,
  data_2003: Number
});
const stateModel = mongoose.model('state', stateSchema);

const institutionSchema = new mongoose.Schema({
  id: Number,
  name: String,
  path: String,
  address: String,
  city: String,
  postal: String,
  zip: String, 
  data_1999: Number,
  data_2000: Number,
  data_2001: Number,
  data_2002: Number,
  data_2003: Number
});
const institutionModel = mongoose.model('institution', institutionSchema);


// initialize the server and configure support for ejs templates
const app = new Express();
app.use(bodyParser.json());
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.get('/api/all', (req, res) => {
//   const filter = {};
//   let retArray = [];

//   stateModel.find(filter, (err, states) => {
//     if (err) {
//       return console.error(err);
//     }
//     retArray = res.json(states);
//   });

//   institutionModel.find(filter, (err, institutions) => {
//     if (err) {
//       return console.error(err);
//     }
//     retArray.push(res.json(institutions));
//   });

//   return retArray;
// });

app.get('/api/state-list', (req, res) => {
  const filter = {};

  stateModel.find(filter, { name: 1, path: 1 }, (err, states) => {
    if (err) {
      return console.error(err);
    }
    console.log(states);
    return res.json(states);
  });
});

app.get('/api/institution-list', (req, res) => {
  const filter = {};

  institutionModel.find(filter, { name: 1, path: 1 }, (err, institutions) => {
    if (err) {
      return console.error(err);
    }
    console.log(institutions);
    return res.json(institutions);
  });
});

app.get('/api/states', (req, res) => {
  const filter = {};

  stateModel.find(filter, (err, states) => {
    if (err) {
      return console.error(err);
    }
    console.log(states);
    return res.json(states);
  });
});

app.get('/api/states/:path', (req, res) => {
  stateModel.findOne({
    path: req.params.path,
  }, (err, state) => {
    if (err) {
      return console.error(err);
    }
    return res.json(state);
  });
});

app.get('/api/institutions', (req, res) => {
  const filter = {};

  institutionModel.find(filter, (err, institutions) => {
    if (err) {
      return console.error(err);
    }
    console.log(institutions);
    return res.json(institutions);
  });
});

app.get('/api/institutions/:path', (req, res) => {
  institutionModel.findOne({
    path: req.params.path,
  }, (err, institution) => {
    if (err) {
      return console.error(err);
    }
    return res.json(institution);
  });
});

// app.get('/api/institutions', (req, res) => {
//   const filter = {};

//   institutionModel.find(filter, (err, institutions) => {
//     if (err) {
//       return console.error(err);
//     }
//     return res.json(institutions);
//   });
// });

// app.get('/api/institutions/:id', (req, res) => {
//   institutionModel.findOne({
//     id: req.params.id,
//   }, (err, institution) => {
//     if (err) {
//       return console.error(err);
//     }
//     return res.json(institution);
//   });
// });

// universal routing and rendering
// app.get('*', (req, res) => {
//   match(
//     { routes, location: req.url },
//     (err, redirectLocation, renderProps) => {

//       // in case of error display the error message
//       if (err) {
//         return res.status(500).send(err.message);
//       }

//       // in case of redirect propagate the redirect to the browser
//       if (redirectLocation) {
//         return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//       }

//       // generate the React markup for the current route
//       let markup;
//       if (renderProps) {
//         // if the current route matched we have renderProps
//         markup = renderToString(<RouterContext {...renderProps}/>);
//       } else {
//         // otherwise we can render a 404 page
//         markup = renderToString(<NotFoundPage/>);
//         res.status(404);
//       }

//       // render the index template with the embedded React markup
//       return res.render('index', { markup });
//     }
//   );
// });

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
