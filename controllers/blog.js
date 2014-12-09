'use strict';

var contentful = require('contentful');
console.log(process.env);
var client = contentful.createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  space: process.env.CONTENTFUL_SPACE
});

exports.index = function(req, res) {
  client.entries({
    limit: 10
  }, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render('blog/index.html', {
        posts: posts
      });
    }
  });
};
