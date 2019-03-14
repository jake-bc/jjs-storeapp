var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

// Load Store Model
const Store = require("../models/Store");

  storeInfo = [];

  router.get('/', function(req, res) {
    B.authorize(req.query, function(err, data) {
      var storedata = data
      const newStore = new Store({
        client_id: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        access_token: storedata.access_token || {},
        scope: storedata.scope || {},
        user: {
          id: storedata.user.id || {},
          email: storedata.user.email || {}
        },
        context: storedata.context || {}
      });
      newStore
      .save()
      .then(store => storeInfo.push(store))
      .catch(err => console.log(err));
      res.status(200).json({"body": data})
      if (err) throw new Error(err);
      return storeData;
    })
    
  });


console.log(storeInfo);
 module.exports = router;
