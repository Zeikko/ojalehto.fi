'use strict';

var express = require('express');
var router = express.Router();
var blog = require('../controllers/blog');
var contentful = require('../services/contentful').client;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {

  });
});
router.get('/blog/', blog.index);
/*
router.get('/blog/:article', blog.index);

router.param('article', function(req, res, next, title) {
  contentful.entries({
  	'content_type': '8InU4PRQJy6eaagyOG8ou',
  	'fields.title': title
  }, function(err, posts) {
    if (err) {
      return next(err);
    } else {
      res.render('blog/index.html', {
        posts: posts
      });
    }
  });
});
*/
module.exports = router;
