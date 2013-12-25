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
        $: function(selector, context) {
          return core.$(selector, context || this.element);
        },
        $$: function(selector, context) {
          return core.$$(selector, context || this.element);
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
          return instances.length > 0 ? instances[0].controller : null
        },
        bootstrap: function(context) {
          var self = this
          core.$$('[data-controller]', context).forEach(function(node) {
            var dataset = node.dataset
            if (null === self.getInstanceByNode(node)) {
              var name = dataset.controller
              if (self.has(name)) {
                self.instances.push({
                  node: node,
                  controller: self.get(name).create(node)
                })
              } else if (typeof dataset.lazyload !== 'undefined') {
                logger.log('Wait for controller definition', name)
              } else {
                logger.error('Undefined controller', name)
              }
            } else {
              // Controller already instantiated
            }
          })
        }
      })
    module.controllers = List.create()
    module.BaseController = BaseController
}(this, this.document, this.core))
