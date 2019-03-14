var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

// Load User Model
const Store = require("../models/Store");

  storeInfo = [];

  router.get('/', function(req, res) {
    B.authorize(req.query, function(err, data) {
      res.status(200).json({"body": data})

      if (err) throw new Error(err);
      console.log(err)
      return data;
    })

    const newStore = new Store({
      client_id: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      access_token: req.body.access_token,
      scope: req.body.scope,
      user: req.body.user || {},
      context: req.body.context || {}
    });

    newStore
    .save()
    .then(store => storeInfo.push(store))
    .catch(err => console.log(err));

        });

console.log(storeInfo);
 module.exports = router;
