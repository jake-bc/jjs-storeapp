var express = require('express');
var router = express.Router();
var dotenv = require('dotenv');
var BigCommerce = require('node-bigcommerce');

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

router.get('/', (req, res, next) => {
    B.authorize(req.query)
      .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data }))
      .catch(next);
    });

 module.exports = router;
