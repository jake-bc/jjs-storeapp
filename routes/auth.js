var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

// Load User Model
const Store = require("../models/Store");

  storeInfo = [];

  router.get('/', function(req, res) {
    B.authorize(req.query, function(err, data) {
      res.status(200).json({"body": data})
      var storedata = JSON.parse(data)
      const newStore = new Store({
        client_id: process.env.CLIENT_ID,
        secret: process.env.SECRET,
        access_token: storedata.access_token || {},
        scope: storedata.scope || {},
        user: {
          id: storedata.user.id || {}
        },
        user: {
          email: storedata.user.email || {}
        },
        user_string: JSON.stringify(storedata.user),
        context: rstoredata.context || {}
      });
      newStore
      .save()
      .then(store => storeInfo.push(store))
      .catch(err => console.log(err));
      
      if (err) throw new Error(err);
      return storeData;
    })
    
  });


console.log(storeInfo);
 module.exports = router;
