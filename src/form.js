(function(root, doc, module) {
  'use strict';
  var form = Object.create(null)
  function serialize(node) {
    var map = {}
    module.$$(node, '[name]').forEach(function(node) {
      map[node.getAttribute('name')] = node.value
    })
    return map
  }
  function unserialize(node, data) {
    module.$$(node, '[name]').forEach(function(node) {
      node.value = data[node.getAttribute('name')]
    })
  }
  form.serialize = serialize
  form.unserialize = unserialize
  module.form = form
}(this, this.document, this.core))
