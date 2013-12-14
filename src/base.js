(function(root, doc, module) {
  'use strict';
  function bind(fn, context) {
    return function bound() {
      fn.call(context, arguments)
    }
  }
  module.bind = bind
  // Set module has global object
  root.core = module
}(this, this.document, this.core = {}))
