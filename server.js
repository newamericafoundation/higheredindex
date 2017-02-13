var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var mongoose = require("mongoose");

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/live_test', function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// const stateSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   path: String,
//   data_1999: Number,
//   data_2000: Number,
//   data_2001: Number,
//   data_2002: Number,
//   data_2003: Number,
//   other_data_1999: Number,
//   other_data_2000: Number,
//   other_data_2001: Number,
//   other_data_2002: Number,
//   other_data_2003: Number
// });
// const stateModel = mongoose.model('state', stateSchema, "final_test");

const institutionSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  path: String,

});
const institutionModel = mongoose.model('institution', institutionSchema, "final_test");
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
  // const filter = {};

  // stateModel.find(filter, { name: 1, path: 1 }, (err, states) => {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log(states);
  //   return res.json(states);
  // });
  return [{}];
});

app.get('/api/institution-list', (req, res) => {
  db.collection('final_test').find({}, { name: 1, path: 1 }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get institutions.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.get('/api/state/:path', (req, res) => {
  stateModel.findOne({
    path: req.params.path,
  }, (err, state) => {
    if (err) {
      return console.error(err);
    }
    return res.json(state);
  });
});

app.get('/api/institution/:path', (req, res) => {
  db.collection('final_test').findOne({path:req.params.path}, function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get institutions.");
    } else {
      res.status(200).json(docs);
    }
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
