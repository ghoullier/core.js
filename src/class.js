(function(root, doc, module) {
  /**
   * Extend class
   * @param  {Object} object prototype
   * @return {Object}        Extended class
   * @api public
   */
  function extend(object) {
    var self = Object.create(this)
    if (!object) return self
    Object.keys(object).forEach(function(key) {
      self[key] = object[key]
    })
    return self
  }
  /**
   * Create a instance of the current class
   * @return {Object} Construtor argument
   * @api public
   */
  function create() {
    var self = Object.create(this)
    if (typeof self.constructor === 'function') {
      self.constructor.apply(self, arguments)
    }
    return self
  }
  module.Class = {
    create: create,
    extend: extend
  }
}(this, this.document, this.core))
