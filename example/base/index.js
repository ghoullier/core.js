(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
var dom = require('./dom')
  , events = require('./events')
  , string = require('./string')
  , utils = require('./utils')
  , Class = require('./class')

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
            return self.indexOf(item) === index;
          })
          // Add event delegation
          .forEach(function(type) {
            var selector = '[' + [namespace, type].join('-') + ']'
            instance.on(type, selector, function(event) {
              var property = prefix + string.firstUpperCase(type)
                , method = this.dataset[property]
                , handler = instance[method]
              if ('function' === typeof handler) {
                handler.call(instance, event)
              } else {
                console.error('Undefined method', this, method, property)
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
        return dom.$(selector, context || this.element);
      },
      $$: function(selector, context) {
        return dom.$$(selector, context || this.element);
      },
      empty: function(node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild)
        }
      },
      on: function(type, selector, handler) {
        events.on(this.element, type, selector, handler)
      },
      bind: function(fn) {
        return utils.bind(fn, this)
      }
    })
module.exports = Controller

},{"./class":1,"./dom":3,"./events":4,"./string":8,"./utils":9}],3:[function(require,module,exports){
var slice = Array.prototype.slice
/**
 * Alias on querySelector for an optional context
 * @param  {string} selector  CSS3 selector
 * @param  {DOMNode} context  Node context
 * @return {null|DOMNOde}     Selected DOMNode
 * @api public
 */
function $(selector, context) {
  context = context || document.documentElement
  return context.querySelector(selector)
}
module.exports.$ = $
/**
 * Alias on querySelectorAll for an optional context
 * @param  {String} selector  CSS3 selector
 * @param  {DOMNOde} context  Node context
 * @return {Array}            Selected Node list
 * @api public
 */
function $$(selector, context) {
  context = context || document.documentElement
  return slice.call(context.querySelectorAll(selector))
}
module.exports.$$ = $$

},{}],4:[function(require,module,exports){
var docEl = document.documentElement
  , matchesSelector =
      docEl.matchesSelector ||
      docEl.webkitMatchesSelector ||
      docEl.mozMatchesSelector ||
      docEl.oMatchesSelector ||
      docEl.msMatchesSelector

/**
 * Get current target for a specific event
 * @param  {DOMNode} node        Parent root node
 * @param  {DOMNode} target      Element to test
 * @param  {String} selector  Selector value
 * @return {Node|Boolean}     False or Target
 * @api private
 */
function getCurrentTarget(node, target, selector) {
  if (matchesSelector.call(target, selector)) return target
  while (target = target.parentNode && node !== target) {
    if (target.nodeType != 1) return false
    if (matchesSelector.call(target, selector)) return target
  }
  return false
}
/**
 * Event delegation
 * @param  {DOMNode} node          Event delegation node
 * @param  {String} type        Event type
 * @param  {String} selector    CSS Selector
 * @param  {Function} handler   Event handler
 * @return {void}
 * @api public
 */
function on(node, type, selector, handler) {
  node.addEventListener(type, function listener(event) {
    var target = getCurrentTarget(node, event.target, selector)
    if (target) {
      handler.call(target, event)
    }
  }, false)
}
module.exports.on = on

},{}],5:[function(require,module,exports){
var dom = require('./dom')
/**
 * Convert form data to a <key, value> object
 * @param  {DOMNode} node Form to serialize
 * @return {Object}       Form data
 * @api public
 */
function serialize(node) {
  var map = {}
  dom.$$('input[name]', node).forEach(function(input) {
    var name = input.getAttribute('name')
    if ('checkbox' === input.getAttribute('type')) {
      map[name] = input.checked
    } else {
      map[name] = input.value
    }
  })
  return map
}
module.exports.serialize = serialize

/**
 * Map object to a form values
 * @param  {DOMNode} node Form node
 * @param  {Object} data  Form data
 * @return {void}
 * @api public
 */
function unserialize(node, data) {
  dom.$$('input[name]', node).forEach(function(input) {
    var value = data[input.getAttribute('name')]
    if ('checkbox' === input.getAttribute('type')) {
      input.checked = value
    } else {
      input.value = value
    }
  })
}
module.exports.unserialize = unserialize

},{"./dom":3}],6:[function(require,module,exports){
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

},{"./class":1,"./controller":2,"./dom":3}],7:[function(require,module,exports){
var Class = require('./class')
  , Store = Class.extend({
    constructor: function(storage) {
      this.storage = storage
    },
    set: function(key, value) {
      this.storage.setItem(key, JSON.stringify({
        value: value
      }))
    },
    get: function(key) {
      return JSON.parse(this.storage.getItem(key)).value
    },
    remove: function(key) {
      this.storage.removeItem(key)
    },
    has: function(key) {
      return null !== this.storage.getItem(key)
    },
    clear: function() {
      this.storage.clear()
    }
  })
module.exports.locale = Store.create(window.localStorage)
module.exports.session = Store.create(window.sessionStorage)

},{"./class":1}],8:[function(require,module,exports){
/**
 * Set the first upper case for a given word
 * @param  {String} word Word to convert
 * @return {String}      Converted word
 * @api public
 */
function firstUpperCase(word) {
  return word ? word.charAt(0).toUpperCase() + word.substring(1) : word
}
module.exports.firstUpperCase = firstUpperCase

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
var manager = require('../../core/manager')
  , form = require('../../core/form')
  , Controller = require('../../core/controller')
  , storage = require('../../core/storage').locale

manager.add('Main', Controller.extend({
  todos: [],
  initialize: function() {
    this.$text = this.$('input[type="text"]')
    this.$completed = this.$('input[type="checkbox"]')
    this.$list = this.$('ol')
    this.$form = this.$('form')
    this.load()
  },
  add: function(todo) {
    var child = document.createElement('li')
    todo = ('undefined' === typeof todo) ? {value: this.$text.value, completed: this.$completed.checked} : todo
    child.textContent = todo.value
    child.classList.add(todo.completed ? 'completed' : 'active')
    this.$list.appendChild(child)
  },
  clear: function() {
    this.empty(this.$list)
    storage.set('Main:list', [])
  },
  load: function() {
    if (storage.has('Main:form')) {
      form.unserialize(this.$form, storage.get('Main:form'))
    }
    this.todos = storage.has('Main:list') ? storage.get('Main:list') : []
    this.todos.forEach(function(todo) {
      this.add(todo)
    }, this)
  },
  submit: function(event) {
    event.preventDefault()
    var todo = form.serialize(this.$form)
    this.add(todo)
    this.todos.push(todo)
    storage.set('Main:list', this.todos)
    this.reset()
  },
  reset: function() {
    form.unserialize(this.$form, {
      value: '',
      completed: false
    })
  }
}))

},{"../../core/controller":2,"../../core/form":5,"../../core/manager":6,"../../core/storage":7}]},{},[10])