(function(root, doc) {
  'use strict';
  // Define core object
  var core = Object.create(null)
  /**
   * Bind function to a specific contex
   * @param  {Function} fn      Function to bin
   * @param  {Object}   context Execution context
   * @return {Function}         Bounded function
   */
  function bind(fn, context) {
    return function bound() {
      fn.call(context, arguments)
    }
  }
  // Public API
  core.bind = bind
  // Set core has global object
  root.core = core
}(this, this.document))
