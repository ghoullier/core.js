(function(root, doc, module) {
  'use strict';
  var docEl = doc.documentElement
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
   * @api public
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
  module.on = on
}(this, this.document, this.core))
