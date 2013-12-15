(function(root, doc, module) {
  'use strict';
  var slice = Array.prototype.slice
  function $(context, selector) {
    if (arguments.length === 1) {
      selector = context
      context = doc.documentElement
    }
    return context.querySelector(selector)
  }
  function $$(context, selector) {
    if (arguments.length === 1) {
      selector = context
      context = doc.documentElement
    }
    return slice.call(context.querySelectorAll(selector))
  }
  module.$ = $
  module.$$ = $$
}(this, this.document, this.core))
