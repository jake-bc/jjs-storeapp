var path = require('path'),
    express = require('express'),
    request = require('request'),
    BigCommerce = require('node-bigcommerce'),
    exphbs = require('express-handlebars'),
    mongoose = require("mongoose"),
    dotenv = require('dotenv'),
    assert = require('assert'),
    app = express(),
    cors = require('cors'),
    router = express.Router();

dotenv.load();

var config = {
    bigCommerce: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        storeHash: process.env.STORE_HASH,
        scope: process.env.SCOPE,
        apiVersion: 'v3',
        responseType: 'json'
    }
};
B = new BigCommerce(config.bigCommerce);

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Connect to MongoDB
const url = process.env.MLABS;
mongoose
.connect(url, function(err, db) {

    if (err) {
      console.log(err);
    } else {
      console.log("connected");
      
      db.collection('Stores', function(err, collection) {

        collection.insert({
            id: 1,
            storeHash: process.env.STORE_HASH,
            accessToken: process.env.ACCESS_TOKEN,
            scope: process.env.SCOPE
        });

        db.collection('Stores').count(function(err, count) {

            console.log('Total Rows: ' + count);
        });
    });
    }
});

app.use(cors())

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

B.get('/catalog/products', null, function(err, data, res) {
    // Catch any errors, or handle the data returned
    // The response object is passed back for convenience

    // res.render();
});

router.get("/products/:product_id", (req, res) => {
    var product_id = req.params.product_id;//gets xavg234
    bigCommerce.get('/catalog/products/'+product_id+'/variants?include_fields=calculated_price,inventory_level,sku,option_values,image_url')
    .then(data => res.json(data))
    .catch((error) => {
        console.log('error: ', error)
        return res.status(404).json({ _err: "No Products Found With ID" });
      })
});


// listen for requests :)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
