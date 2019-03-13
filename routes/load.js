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

router.get('/',(req, res, next) => {
    try {
      const data = B.verify(req.query['signed_payload']);
      res.render('integrations/welcome', { title: 'Welcome!', data: data });
    } catch (err) {
      next(err);
    }
  });
module.exports = router;
