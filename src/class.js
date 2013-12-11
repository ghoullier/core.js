(function(root, doc, module) {
  'use strict';
  function extend(object) {
    var self = Object.create(this)
    if (!object) return self
    Object.keys(object).forEach(function(key) {
      self[key] = object[key]
    })
    return self
  }
  function create() {
    var self = Object.create(this)
    if (typeof self.constructor === 'function') {
      self.constructor.apply(self, arguments)
    }
    return self
  }
  module.extend = extend
  module.create = create
}(this, this.document, this.core))
