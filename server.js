var path = require('path'),
    express = require('express'),
    request = require('request'),
    BigCommerce = require('node-bigcommerce'),
    exphbs = require('express-handlebars'),
    dotenv = require('dotenv'),
    assert = require('assert'),
    app = express(),
    router = express.Router(),
    url = 'mongodb://localhost:27017/test';

var MongoClient = require('mongodb').MongoClient;

dotenv.load();
var config = {
    bigCommerce: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        storeHash: process.env.STORE_HASH,
        scope: process.env.SCOPE,
        responseType: 'json'
    }
};
B = new BigCommerce(config.bigCommerce);

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


MongoClient.connect(url, function(err, db) {

    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      
      db.collection('Stores', function(err, collection) {

        collection.insert({
            id: 1,
            storeHash: 'grief',
            accessToken: 'token',
            scope: 'store_v2_products'
        });

        db.collection('Stores').count(function(err, count) {

            console.log('Total Rows: ' + count);
        });
    });
    }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.render('home');
});

router.get('/auth', function(req, res) {
    B.authorize(req.query, function(err, data) {
        // TODO: Add code to grab current customer store hash and access token

        // res.render();
    });
});

router.get('/load', function(req, res) {
    B.callback(req.query['sign_payload'], function(err, data) {
        // res.render();
    });
});

B.get('/products', null, function(err, data, res) {
    // Catch any errors, or handle the data returned
    // The response object is passed back for convenience

    // res.render();
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});
