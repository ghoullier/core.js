/*!
 * core.js 0.0.0 (2013-12-14, 11:18)
 * https://github.com/ghoullier/core.js
 * MIT licensed
 *
 * Copyright (C) 2014 Grégory homepage
 */!function(a,b,c){"use strict";function d(a,b){return function(){a.call(b,arguments)}}c.bind=d,a.core=c}(this,this.document,this.core={}),function(a,b,c){"use strict";function d(a,c){return 1===arguments.length&&(c=a),(a||b).querySelector(c)}function e(a,c){return 1===arguments.length&&(c=a),f.call((a||b).querySelectorAll(c))}var f=Array.prototype.slice;c.$=d,c.$$=e}(this,this.document,this.core),function(a,b,c){"use strict";function d(a,b,c){if(g.call(b,c))return b;for(;b=b.parentNode&&a!==b;){if(1!=b.nodeType)return!1;if(g.call(b,c))return b}return!1}function e(a,b,c,e){a.addEventListener(b,function(b){var f=d(a,b.target,c);f&&e.call(f,b)},!1)}var f=b.documentElement,g=f.matchesSelector||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector;c.on=e}(this,this.document,this.core),function(a,b,c){function d(a){var b=Object.create(this);return a?(Object.keys(a).forEach(function(c){b[c]=a[c]}),b):b}function e(){var a=Object.create(this);return"function"==typeof a.constructor&&a.constructor.apply(a,arguments),a}c.Class={create:e,extend:d}}(this,this.document,this.core);