(function(root, doc, module) {
  'use strict';
  var logger = console
    , Class = core.Class
    , BaseController = Class.extend({
        constructor: function(element) {
          var instance = this
          instance.element = element
          instance.on('click', '[data-method]', function(event) {
            var method = this.dataset.method
              , handler = instance[method]
            if ('function' === typeof handler) {
              handler.call(instance, event)
            } else {
              logger.error('Undefined method', method)
            }
          })
          this.initialize()
        },
        initialize: function() {
          // Abstract
        },
        $: function(selector) {
          return core.$(selector, this.element);
        },
        $$: function(selector) {
          return core.$$(selector, this.element);
        },
        on: function(type, selector, handler) {
          core.on(this.element, type, selector, handler)
        },
        bind: function(fn) {
          return core.bind(fn, this)
        }
      })
    , List = Class.extend({
        constructor: function() {
          var self = this
          self.definitions = {}
          self.instances = []
          doc.addEventListener('DOMContentLoaded', function() {
            self.bootstrap(doc.documentElement)
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
          return BaseController.isPrototypeOf(this.get(name))
        },
        getInstanceByNode: function(node) {
          var instances = this.instances.filter(function(value) {
            return value.node === node
          })
          return instances.length > 0 ? instances[0] : null
        },
        bootstrap: function(context) {
          var self = this
          core.$$('[data-controller]', context).forEach(function(node) {
            var name = node.dataset.controller
            if (self.has(name)) {
              self.instances.push({
                node: node,
                controller: self.get(name).create(node)
              })
            } else {
              logger.error('Undefined controller', name)
            }
          })
        }
      })
    module.controllers = List.create()
    module.BaseController = BaseController
}(this, this.document, this.core))
