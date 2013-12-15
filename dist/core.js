/*
 * core.js 0.0.0 (2013-12-15, 17:29)
 * https://github.com/ghoullier/core.js
 * MIT licensed
 *
 * Copyright (C) 2014 Grégory Houllier
 */

!function(a){"use strict";function b(a,b){return function(){a.apply(b,arguments)}}var c=Object.create(null);c.bind=b,a.core=c}(this,this.document),function(a,b,c){"use strict";function d(a,c){return 1===arguments.length&&(c=a,a=b.documentElement),a.querySelector(c)}function e(a,c){return 1===arguments.length&&(c=a,a=b.documentElement),f.call(a.querySelectorAll(c))}var f=Array.prototype.slice;c.$=d,c.$$=e}(this,this.document,this.core),function(a,b,c){"use strict";function d(a,b,c){if(g.call(b,c))return b;for(;b=b.parentNode&&a!==b;){if(1!=b.nodeType)return!1;if(g.call(b,c))return b}return!1}function e(a,b,c,e){a.addEventListener(b,function(b){var f=d(a,b.target,c);f&&e.call(f,b)},!1)}var f=b.documentElement,g=f.matchesSelector||f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector;c.on=e}(this,this.document,this.core),function(a,b,c){function d(a){var b=Object.create(this);return a?(Object.keys(a).forEach(function(c){b[c]=a[c]}),b):b}function e(){var a=Object.create(this);return"function"==typeof a.constructor&&a.constructor.apply(a,arguments),a}c.Class={create:e,extend:d}}(this,this.document,this.core),function(a,b,c){"use strict";var d=console,e=core.Class,f=e.extend({constructor:function(a){var b=this;b.element=a,b.on("click","[data-method]",function(a){var c=this.dataset.method,e=b[c];"function"==typeof e?e.call(b,a):d.error("Undefined method",c)}),this.initialize()},initialize:function(){},$:function(a){return core.$(this.element,a)},$$:function(a){return core.$$(this.element,a)},on:function(a,b,c){core.on(this.element,a,b,c)},bind:function(a){return core.bind(a,this)}}),g=e.extend({constructor:function(){var a=this;a.map={},a.instances=[],b.addEventListener("DOMContentLoaded",function(){a.bootstrap(b.documentElement)},!1)},add:function(a,b){return this.map[a]=b,this},get:function(a){return this.map[a]},has:function(a){return f.isPrototypeOf(this.get(a))},bootstrap:function(a){var b=this;core.$$(a,"[data-controller]").forEach(function(a){var c=a.dataset.controller;b.has(c)?b.instances.push(b.get(c).create(a)):d.error("Undefined controller",c)})}});c.controllers=g.create(),c.BaseController=f}(this,this.document,this.core);
//# sourceMappingURL=../dist/core.js.map