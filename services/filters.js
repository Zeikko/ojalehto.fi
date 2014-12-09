'use strict';

var markdown = require('markdown').markdown;

exports.setFilters = function(swig) {
	console.log(markdown);
  swig.setFilter('toHTML', function(element) {
    return markdown.toHTML(element);
  });
}
