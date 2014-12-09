'use strict';

var express = require('express');
var router = express.Router();
var blog = require('../controllers/blog');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	
  });
});
router.get('/blog', blog.index);

module.exports = router;
