'use strict';

var express = require('express');
var router = express.Router();
var index = require('../controllers/index'),
	post = require('../controllers/post'),
	hacks = require('../controllers/hacks'),
	about = require('../controllers/about');

/* GET home page. */
router.get('/', index.render);
router.get('/post/:slug/:id', post.render);
router.get('/hacks', hacks.render);
router.get('/about', about.render);

module.exports = router;
