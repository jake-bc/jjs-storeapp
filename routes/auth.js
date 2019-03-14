var express = require('express');
var router = express.Router();
var B = require('../config/keys').B

router.get('/auth', (req, res, next) => {
  B.authorize(req.query)
    .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data }))
    .catch(next);
  });

 module.exports = router;
