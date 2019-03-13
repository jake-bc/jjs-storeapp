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
    bodyParser = require("body-parser"),
    auth = require('./routes/auth'),
    load = require('./routes/load'),
    products = require('./routes/catalog/products')
    router = express.Router();


dotenv.load();

var config = {
    bigCommerce: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        storeHash: process.env.STORE_HASH,
        scope: process.env.SCOPE,
        callback: '/',
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(express.static('views'));

app.use('/auth', auth);
app.use('/load', load);
app.use('/products', products);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
    res.render('home');
});


B.get('/catalog/products')
.then(data => res.json(data))
  
// listen for requests :)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
