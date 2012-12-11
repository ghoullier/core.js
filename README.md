core.js Documentation
==================================================

A lightweight module manager

Using Core.js
--------------------------------------

Include core.js file in the web of your body

Javascript Part
--------------------------------------

Define a new module with the following structure
```javascript
(function(/*Window*/w, undefined) {
	// Sandboxed global variables
	var Core = w.Core,
		m = Core.modules || {};
	// Define your module, Vanilla JS
	m.MyModule = (function() {
		// Module constructor
		var Class = function(properties, node) {
			if (this instanceof Class) {
				// Initialize your module
			} else {
				throw new Error("Illegal constructor");
			}
		};
		// Modules methods using prototype
		Class.prototype.postCreate = function() {
			// Automatically fired by core.js when module is initialized
		};
		Class.prototype.myMethod = function() {
			// TODO: Do what do you want
		};
		return Class;
	}());
}(this));
```


HTML Part
--------------------------------------
```html
<div data-module="MyModule">
	<button data-method="myMethod">myMethod<button>
</div>
```