'use strict';

var Prismic = require('prismic.io').Prismic,
    config = require('../config/config').config(),
    _ = require('lodash'),
    moment = require('moment');

exports.getBlogPosts = function(callback) {
    Prismic.Api(config.apiEndpoint, function(err, Api) {
        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.at("document.type", "blog")).submit(function(err, data) {
                if (err) {
                    callback(err, []);
                } else {
                    callback(null, addFunctionsToObjects(data.results));
                }
            });
    });
}

exports.getDocument = function(id, callback) {
    Prismic.Api(config.apiEndpoint, function(err, Api) {
        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.at("document.id", id)).submit(function(err, data) {
                if (err) {
                    callback(err, []);
                } else {
                    callback(null, addFunctionsToObjects(data.results)[0]);
                }
            });
    });
}

exports.getSimilar = function(id, limit, callback) {
    Prismic.Api(config.apiEndpoint, function(err, Api) {
        Api.form('everything')
            .ref(Api.master())
            .query(Prismic.Predicates.similar(id, limit)).submit(function(err, data) {
                if (err) {
                    callback(err, []);
                } else {
                    callback(null, addFunctionsToObjects(data.results));
                }
            });
    });
}

function addFunctionsToObjects(objects) {
    var objects = _.map(objects, function(object) {
        if (object && typeof object === 'object') {
            object.html = function(fragment) {
                var html = this.getStructuredText(fragment).asHtml({
                    linkResolver: config.linkResolver
                });
                html = html.replace(/^(<[A-z][0-9]>)/, '');
                html = html.replace(/(<[A-z][0-9]>)$/, '');
                return html;
            };
            object.date = function(fragment) {
                return moment(this.getDate(fragment)).format('MMM D, YYYY');
            }
        }
        return object;
    });
    return objects;
}
