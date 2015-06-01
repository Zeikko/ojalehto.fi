'use strict';

exports.render = function(req, res, next) {
    res.render('hacks', {
        image: 'img/main-bg.jpg'
    });
};
