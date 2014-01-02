define(function(require, exports, module) {
  /**
   * Bind function to a specific contex
   * @param  {Function} fn      Function to bin
   * @param  {Object}   context Execution context
   * @return {Function}         Bounded function
   * @api public
   */
  function bind(fn, context) {
    return function bound() {
      return fn.apply(context, arguments)
    }
  }
  module.exports.bind = bind
})
