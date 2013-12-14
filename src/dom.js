(function(root, doc, module) {
  'use strict';
  var slice = Array.prototype.slice
  function $(context, selector) {
    if (arguments.length === 1) selector = context
    return (context || doc).querySelector(selector)
  }
  function $$(context, selector) {
    if (arguments.length === 1) selector = context
    return slice.call((context || doc).querySelectorAll(selector))
  }
  module.$ = $
  module.$$ = $$
}(this, this.document, this.core))
