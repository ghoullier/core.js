(function(root, name, factory) {
  // Set up appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['exports'], function(exports) {
      factory(root, exports)
    });
  // Next for Node.js or CommonJS
  } else if (typeof exports !== 'undefined') {
    factory(root, exports)
  // Finally, as a browser global.
  } else {
    root[name] = factory(root, {})
  }
}(this, 'core', function(root, exports) {

  // Function Utilities
  // ---------------

  // Bind function to a specific contex
  // @param  {Function} fn      Function to bin
  // @param  {Object}   context Execution context
  // @return {Function}         Bounded function
  // @api public
  function bind(fn, context) {
    return function bound() {
      return fn.apply(context, arguments)
    }
  }
  exports.bind = bind


  // String Utilities
  // ---------------

  // Set the first upper case for a given word
  // @param  {String} word Word to convert
  // @return {String}      Converted word
  // @api public
  function toPascalCase(word) {
    return word ? word.charAt(0).toUpperCase() + word.substring(1) : word
  }
  exports.toPascalCase = toPascalCase


  // DOM Manipulation
  // ---------------

  var slice = Array.prototype.slice

  // Alias on querySelector for an optional context
  // @param  {string} selector  CSS3 selector
  // @param  {DOMNode} context  Node context
  // @return {null|DOMNOde}     Selected DOMNode
  // @api public
  function $(selector, context) {
    context = context || document.documentElement
    return context.querySelector(selector)
  }
  exports.$ = $

  // Alias on querySelectorAll for an optional context
  // @param  {String} selector  CSS3 selector
  // @param  {DOMNOde} context  Node context
  // @return {Array}            Selected Node list
  // @api public
  function $$(selector, context) {
    context = context || document.documentElement
    return slice.call(context.querySelectorAll(selector))
  }
  exports.$$ = $$


  // DOM Event Utilities
  // ---------------

  var docEl = document.documentElement
    , matchesSelector =
        docEl.matchesSelector ||
        docEl.webkitMatchesSelector ||
        docEl.mozMatchesSelector ||
        docEl.oMatchesSelector ||
        docEl.msMatchesSelector

  // Get current target for a specific event
  // @param  {DOMNode} node        Parent root node
  // @param  {DOMNode} target      Element to test
  // @param  {String} selector  Selector value
  // @return {Node|Boolean}     False or Target
  // @api private
  function getCurrentTarget(node, target, selector) {
    if (matchesSelector.call(target, selector)) return target
    while (target = target.parentNode && node !== target) {
      if (target.nodeType != 1) return false
      if (matchesSelector.call(target, selector)) return target
    }
    return false
  }

  // Event delegation
  // @param  {DOMNode} node          Event delegation node
  // @param  {String} type        Event type
  // @param  {String} selector    CSS Selector
  // @param  {Function} handler   Event handler
  // @return {void}
  // @api public
  function on(node, type, selector, handler) {
    node.addEventListener(type, function listener(event) {
      var target = getCurrentTarget(node, event.target, selector)
      if (target) {
        handler.call(target, event)
      }
    }, false)
  }
  exports.on = on


  // Form Utilities
  // ---------------

  // Convert form data to a <key, value> object
  // @param  {DOMNode} form Form to serialize
  // @return {Object}       Form data
  // @api public
  function serializeForm(form) {
    var map = {}
    $$('input[name]', form).forEach(function(input) {
      var name = input.getAttribute('name')
      if ('checkbox' === input.getAttribute('type')) {
        map[name] = input.checked
      } else {
        map[name] = input.value
      }
    })
    return map
  }
  exports.serializeForm = serializeForm

  // Map object to a form values
  // @param  {DOMNode} fom Form node
  // @param  {Object} data  Form data
  // @return {void}
  // @api public
  function unserializeForm(form, data) {
    $$('input[name]', form).forEach(function(input) {
      var value = data[input.getAttribute('name')]
      if ('checkbox' === input.getAttribute('type')) {
        input.checked = value
      } else {
        input.value = value
      }
    })
  }
  exports.unserializeForm = unserializeForm


  // Template System
  // ---------------

  var patternRegExp = /\{\{([\w\*\.]*?)\}\}/g
    , dotRegExp = /([^\.]+)/g
    , parser = document.createElement('div')

  // Build Node fragment
  // @param  {Object} params Build parameters
  // @return {NodeFragment}  Builded Node fragment
  // @api public
  function build(params) {
    var template
    if (params.id) {
      template = getTemplateById(params.id)
    } else if (params.uri) {
      template = getTemplateByUri(params.uri)
    }
    return parse(compile(template, params.data))
  }
  exports.build = build

  // Compile template
  // @param  {String} template String to precompile
  // @param  {Object} object   Template arguments
  // @return {String}          Precompiled template
  // @api public
  function compile(template, object) {
    var args = arguments.length > 2 ? arguments : object
    return template.replace(patternRegExp, function(value, property) {
      var key
        , map = args
      while ((key = dotRegExp.exec(property)) && (key = key[1])) {
        map = map ? (key == '*' ? map : map[key]) : null
      }
      return map == void 0 ? '' : map
    })
  }
  exports.compile = compile

  // Parse HTML string
  // @param  {String} html HTML string
  // @return {DOMFragment} Parsed DOMFragment
  // @api public
  function parse(html) {
    var fragment = document.createDocumentFragment()
    parser.innerHTML = html
    while (parser.firstChild) {
      fragment.appendChild(parser.firstChild)
    }
    return fragment
  }
  exports.parse = parse

  // Get template by id
  // @param  {String} id Template id
  // @return {String}    Template string
  // @api public
  function getTemplateById(id) {
    var template = document.getElementById(id)
    return template ? template.innerHTML.trim() : null
  }
  exports.getTemplateById = getTemplateById

  // Get template by uri
  // @param  {String} uri Template uri
  // @return {String}     Template string
  // @api public
  function getTemplateByUri(uri) {
    var loader = new XMLHttpRequest()
    loader.open('GET', uri, false)
    loader.send(null)
    return 200 === loader.status ? loader.responseText.trim() : null
  }
  exports.getTemplateByUri = getTemplateByUri


  // Class Systeme
  // ---------------

  var Class = {
    create: create,
    extend: extend
  }

  // Extend class
  // @param  {Object} object prototype
  // @return {Object}        Extended class
  // @api public
  function extend(object) {
    var self = Object.create(this)
    if (!object) return self
    Object.keys(object).forEach(function(key) {
      self[key] = object[key]
    })
    return self
  }

  // Create a instance of the current class
  // @return {Object} Construtor argument
  // @api public
  function create() {
    var self = Object.create(this)
    if ('function' === typeof self.constructor) {
      self.constructor.apply(self, arguments)
    }
    return self
  }

  exports.Class = Class


  // Micro Controller Class
  // ---------------

  var Controller = Class.extend({
      constructor: function(element) {
        // Set element property
        this.element = element
        // Event delegation
        this.delegate()
        // Call abstract method
        this.initialize()
      },
      delegate: function() {
        var instance = this
          , prefix = 'on'
          , namespace = ['data', prefix].join('-')
        // List event types
        var types = []
        instance.$$('[' + namespace + ']').forEach(function(node) {
          types = types.concat(Object.keys(node.dataset)
            .filter(function(handler) {
              return handler.startsWith(prefix) && handler.length > prefix.length
            })
            .map(function(handler) {
              return handler.substring(prefix.length).toLowerCase()
            }))
        })
        types
          // Filter duplicates entries
          .filter(function(item, index, self) {
            return self.indexOf(item) === index
          })
          // Add event delegation
          .forEach(function(type) {
            var selector = '[' + [namespace, type].join('-') + ']'
            instance.on(type, selector, function(event) {
              var property = prefix + toPascalCase(type)
                , method = this.dataset[property]
                , handler = instance[method]
              if ('function' === typeof handler) {
                handler.call(instance, event)
              } else {
                var message = 'Undefined function "{{method}}" for the handler "{{property}}"'
                console.error(compile(message, {
                  method: method,
                  property: property
                }))
              }
            })
          })
      },
      initialize: function() {
        // Abstract
      },
      getTemplateArgs: function() {
        var dataset = this.element.dataset
        return {
          id: dataset.templateId,
          uri: dataset.templateUri,
          data: this.getTemplateData()
        }
      },
      getTemplateData: function() {
        // Abstract
      },
      $: function(selector, context) {
        return $(selector, context || this.element)
      },
      $$: function(selector, context) {
        return $$(selector, context || this.element)
      },
      empty: function(node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild)
        }
      },
      on: function(type, selector, handler) {
        on(this.element, type, selector, handler)
      },
      bind: function(fn) {
        return bind(fn, this)
      }
    })

  exports.Controller = Controller

  var Manager = Class.extend({
      constructor: function() {
        var self = this
        self.definitions = {}
        self.instances = []
        var bootstrap = function() {
          self.bootstrap(document.documentElement)
        }
        if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) > -1) {
          bootstrap()
        } else {
          document.addEventListener('DOMContentLoaded', bootstrap, false)
        }
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
        $$('[data-controller]', context).forEach(function(node) {
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
        return self
      }
    })

  return exports
}));
