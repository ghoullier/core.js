var dom = require('./dom')
  , Class = require('./class')
  , Controller = require('./controller')
  , Manager = Class.extend({
      constructor: function() {
        var self = this
        self.definitions = {}
        self.instances = []
        document.addEventListener('DOMContentLoaded', function() {
          self.bootstrap(document.documentElement)
        }, false)
      },
      add: function(name, factory) {
        this.definitions[name] = factory
        return this
      },
      get: function(name) {
        return this.definitions[name]
      },
      has: function(name) {
        return Controller.isPrototypeOf(this.get(name))
      },
      getInstanceByNode: function(node) {
        var instances = this.instances.filter(function(value) {
          return value.node === node
        })
        return instances.length > 0 ? instances[0].controller : null
      },
      bootstrap: function(context) {
        var self = this
        dom.$$('[data-controller]', context).forEach(function(node) {
          var dataset = node.dataset
          if (null === self.getInstanceByNode(node)) {
            var name = dataset.controller
            if (self.has(name)) {
              self.instances.push({
                node: node,
                controller: self.get(name).create(node)
              })
            } else if (typeof dataset.lazyload !== 'undefined') {
              console.log('Wait for controller definition', name)
            } else {
              console.error('Undefined controller', name)
            }
          } else {
            // Controller already instantiated
          }
        })
      }
    })
module.exports = Manager.create()
