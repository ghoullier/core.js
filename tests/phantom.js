// Fix phantomjs issue
// http://stackoverflow.com/questions/16802795/click-not-working-in-mocha-phantomjs-on-certain-elements
;(function(root, doc, module) {
  function trigger(node, type) {
    var event = doc.createEvent('MouseEvent');
    event.initMouseEvent(
      type,
      true /* bubble */, true /* cancelable */,
      root, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    node.dispatchEvent(event);
  }
  function click(node) {
    if ('function' === typeof node.click) {
      node.click()
    } else {
      trigger(node, 'click')
    }
  }
  module.click = click
}(this, this.document, this.phantom = {}))
;(function(root, doc, module) {
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      }
    });
  }
}(this, this.document, this.phantom))
