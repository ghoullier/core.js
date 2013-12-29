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
module.exports.extend = extend

/**
 * Create a instance of the current class
 * @return {Object} Construtor argument
 * @api public
 */
function create() {
  var self = Object.create(this)
  if ('function' === typeof self.constructor) {
    self.constructor.apply(self, arguments)
  }
  return self
}
module.exports.create = create
