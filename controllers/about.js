'use strict';

exports.render = function(req, res, next) {
    res.render('about', {
        image: 'img/main-bg.jpg'
    });
};
