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
		Core.mixin(Class.prototype, {
			postCreate: function() {
				c.log("Module has been initialized by Core.js");
			},
			sayMyName: function() {
				var name = this.$.name.value;
				if (typeof name === "string" && name.length > 0) {
					this.name = name;
					c.log("Your name is : " + name);
				}
			}
		});
		return Class;
	}());
}(this));