var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var B = require('../config/keys').B

  storeInfo = [];

  router.get('/', function(req, res) {
    B.authorize(req.query, function(err, data) {
      res.status(200).json({"body": data, query: req.query})

      storeInfo.push({query: req.query})
      console.log("storeInfo " +storeInfo.query)

      if (err) throw new Error(err);
      console.log(err)
      return storeInfo;
    })

    const url = process.env.MLABS;
    mongoose
        .connect(url, function (err, db) {
    
          if (err) {
            console.log(err);
          } else {
            console.log("connected");
            
            db.collection('Stores', function(err, collection) {
      
              collection.insert({
                query: req.query
            });
      
              db.collection('Stores').count(function(err, count) {
      
                  console.log('Total Rows: ' + count);
              });
          });
          }
      });
        });


 module.exports = router;
