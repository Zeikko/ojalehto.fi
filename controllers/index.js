'use strict';
var prismic = require('../services/prismic');

exports.render = function(req, res, next) {
    prismic.getBlogPosts(function(err, posts) {
        res.render('index', {
            image: 'img/main-bg.jpg',
            posts: posts
        });
    });
};
