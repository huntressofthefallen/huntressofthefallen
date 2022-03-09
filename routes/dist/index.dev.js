"use strict";

var express = require('express');

var router = express.Router();
/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Jean & Soph',
    responded: 'visually-hidden'
  });
});
router.post('/', function (req, res, next) {
  if (req.body.password.toLowerCase() == 'anchovy' || req.body.password.toLowerCase() == 'anchovies') {
    res.render('first', {
      title: 'Andika & Лилия'
    });
  } else if (req.body.password.toLowerCase() == 'valentine' || req.body.password.toLowerCase() == 'valentines') {
    res.render('valentine', {
      title: 'Andika & Лилия'
    });
  } else if (req.body.password.toLowerCase() == 'anniversary' || req.body.password.toLowerCase() == 'anniversaries') {
    res.render('anniversary', {
      title: 'Andika & Лилия'
    });
  } else {
    res.render('index', {
      title: 'Jean & Soph',
      responded: ''
    });
  }
});
module.exports = router;