'use strict';

exports.config = function() {
	return {
		apiEndpoint: 'https://ojalehto.prismic.io/api',
		linkResolver: function (ctx, doc, isBroken) {
			if (isBroken) {
				return '#broken';
			}
		    return '/' + doc.slug + '/' + doc.id + ( ctx.maybeRef ? '?ref=' + ctx.maybeRef : '' );
		}
	}
}