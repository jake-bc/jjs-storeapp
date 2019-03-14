var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

const Store = require("../models/Store");

router.get('/',(req, res, next) => {
    try {
      const data = B.verify(req.query['signed_payload']);
      Store.findOne({context: data.context}).then(store => {
        if (store) {
          Store.findOneAndUpdate(
            { store: data.context },
            { $set: { hash: data.store_hash}},
            { new: true }
          ).then(store => res.status(200).json(store));
        }
      })

    } catch (err) {
      res.render('home', { title: 'Welcome!', data: data })
      next(err);
    }
  });
module.exports = router;
