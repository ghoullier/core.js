(function(/*Window*/w, undefined) {
  // Define sandboxed global variables
  var d = w.document,
      c = w.console,
      Core = w.Core;
  // Modules namespace
  var m = Core.modules || {};
  m.Demo = (function() {
    var Class = function(/*DOMStringMap*/properties, /*Node*/root) {
      if (this instanceof Class) {
        // Specific constructor
        this.name = properties.name ? properties.name : "default";
      } else {
        throw new Error("Illegal constructor");
      }
    };
    Class.prototype.sayMyName = function() {
      var name = this.$.name.value;
      if (typeof name === "string" && name.length > 0) {
        this.name = name;
        w.alert("Your name is : " + name);
      }
    };
    return Class;
  }());
}(this));