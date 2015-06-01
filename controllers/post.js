'use strict';
var prismic = require('../services/prismic'),
    async = require('async');

exports.render = function(req, res, next) {
    prismic.getDocument(req.params.id, function(err, post) {
        async.parallel({
            author: function(callback) {
                prismic.getDocument(post.getLink('blog.author').id, callback);
            },
            similars: function(callback) {
                prismic.getSimilar(post.id, 10, callback);
            }
        }, function(err, data) {
            res.render('post', {
                similars: data.similars,
                author: data.author,
                post: post
            });
        });
    });
};
