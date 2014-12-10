'use strict';

var contentful = require('../services/contentful').client;

exports.index = function(req, res, next) {
  contentful.entries({
    limit: 10
  }, function(err, posts) {
    if (err) {
      return next(err);
    } else {
      res.render('blog/index.html', {
        posts: posts
      });
    }
  });
};
