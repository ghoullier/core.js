(function(root, doc, module) {
  'use strict';
  /**
   * Convert form data to a <key, value> object
   * @param  {DOMNode} node Form to serialize
   * @return {Object}       Form data
   * @api public
   */
  function serialize(node) {
    var map = {}
    module.$$('input[name]', node).forEach(function(input) {
      var name = input.getAttribute('name')
      if ('checkbox' === input.getAttribute('type')) {
        map[name] = input.checked
      } else {
        map[name] = input.value
      }
    })
    return map
  }
  /**
   * Map object to a form values
   * @param  {DOMNode} node Form node
   * @param  {Object} data  Form data
   * @return {void}
   * @api public
   */
  function unserialize(node, data) {
    module.$$('input[name]', node).forEach(function(input) {
      var value = data[input.getAttribute('name')]
      if ('checkbox' === input.getAttribute('type')) {
        input.checked = value
      } else {
        input.value = value
      }
    })
  }
  // Define submodule
  var form = Object.create(null)
  form.serialize = serialize
  form.unserialize = unserialize
  // Export submodule
  module.form = form
}(this, this.document, this.core))
