var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

router.get('/', (req, res, next) => {
    B.authorize(req.query, (data) => {
      console.log(data)
      return data;
    })
      .then(data => res.render('home', { title: 'Authorized!', data: data }))
      .catch(next);
    });

 module.exports = router;
