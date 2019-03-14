var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

router.get('/',(req, res, next) => {
    try {
      const data = B.verify(req.query['signed_payload']);
      res.render('home', { title: 'Welcome!', data: data });
    } catch (err) {
      res.render('home', { title: 'Welcome!', data: data })
      next(err);
    }
  });
module.exports = router;
