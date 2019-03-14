var express = require('express'),
    exphbs = require('express-handlebars'),
    mongoose = require("mongoose"),
    cors = require('cors'),
    bodyParser = require("body-parser"),
    auth = require('./routes/auth'),
    load = require('./routes/load'),
    products = require('./routes/catalog/products');
    var AirbrakeClient = require('airbrake-js')
    var airbrakeExpress = require('airbrake-js/dist/instrumentation/express')

const app = express();

  var airbrake = new AirbrakeClient({
    projectId: 218372,
    projectKey: '83eef3a216bc62a95fabde08e95b6762'
  });
  
// This middleware should be used before any routes are defined.
app.use(airbrakeExpress.makeMiddleware(airbrake))

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));

app.use('/auth', auth);
app.use('/load', load);
app.use('/products', products);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.render('home');
});

// Error handler middleware should be the last one.
// See http://expressjs.com/en/guide/error-handling.html
app.use(airbrakeExpress.makeErrorHandler(airbrake))

// listen for requests :)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
