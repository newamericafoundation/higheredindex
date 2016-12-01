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

const athleteSchema = new mongoose.Schema({
  id: String,
  name: String,
  country: String,
  birth: Number,
  image: String,
  cover: String,
  link: String
});
const athleteModel = mongoose.model('athlete', athleteSchema);


// initialize the server and configure support for ejs templates
const app = new Express();
app.use(bodyParser.json());
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.get('/api/athletes', (req, res) => {
  const filter = {};

  athleteModel.find(filter, (err, athletes) => {
    if (err) {
      return console.error(err);
    }
    return res.json(athletes);
  });
});

app.get('/api/athletes/:id', (req, res) => {
  athleteModel.findOne({
    id: req.params.id,
  }, (err, athlete) => {
    if (err) {
      return console.error(err);
    }
    return res.json(athlete);
  });
});

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
