;(function(root, doc, module) {
  'use strict';
  var slice = Array.prototype.slice
  function $(selector) {
    return doc.querySelector(selector)
  }
  function $$(selector) {
    return slice.call(doc.querySelectorAll(selector))
  }
  module.$ = $
  module.$$ = $$
}(this, this.document, this.core))
