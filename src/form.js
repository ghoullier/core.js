(function(root, doc, module) {
  'use strict';
  var form = Object.create(null)
  function serialize(node) {
    var map = {}
    module.$$(node, 'input[name]').forEach(function(input) {
      var name = input.getAttribute('name')
      if ('checkbox' === input.getAttribute('type')) {
        map[name] = input.checked
      } else {
        map[name] = input.value
      }
    })
    return map
  }
  function unserialize(node, data) {
    module.$$(node, 'input[name]').forEach(function(input) {
      var value = data[input.getAttribute('name')]
      if ('checkbox' === input.getAttribute('type')) {
        input.checked = value
      } else {
        input.value = value
      }
    })
  }
  form.serialize = serialize
  form.unserialize = unserialize
  module.form = form
}(this, this.document, this.core))
