'use strict';

var markdown = require('markdown').markdown;

exports.setFilters = function(swig) {
  swig.setFilter('toHTML', function(element) {
    return markdown.toHTML(element);
  });
}
