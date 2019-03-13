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

router.get("/:product_id", (req, res) => {
    var product_id = req.params.product_id;//gets xavg234
    B.get('/catalog/products/'+product_id+'/variants?include_fields=calculated_price,inventory_level,sku,option_values,image_url')
    .then(data => res.json(data))
    .catch((error) => {
        console.log('error: ', error)
        return res.status(404).json({ _err: "No Products Found With ID" });
      })
});

module.exports = router;