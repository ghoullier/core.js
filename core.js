// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name core.min.js
// ==/ClosureCompiler==

(function(w, undefined) {
	// Define sandboxed global variables
	var d = w.document,
			c = w.console;
	// Core.js global object
	var Core = w.Core || {};

	/////////////////////////////////////////////////////////////////////////////////////
	//														Define private Core methods
	/////////////////////////////////////////////////////////////////////////////////////

	// Basic mixin, extend base object with some extra properties
	var core_mixin = function(/*Object*/base, /*Object*/extend) {
		var property = null;
		for (property in extend) {
			if (extend.hasOwnProperty(property)) {
				base[property] = extend[property];
			}
		}
	};
	// Add event listener using the following pattern: data-bind="{'event':'method'}"
	// The method scope is module instance
	var core_bind_method = function(/*Object*/instance, /*Node*/root) {
		var nodes = root.querySelectorAll("*[data-method]");
		Core.forEach.call(nodes, function(/*Node*/node) {
			var json = node.dataset.method.replace(/\'/g, "\""),
					map = JSON.parse(json),
					event = null;
			for (event in map) {
				if (map.hasOwnProperty(event)) {
					var method = map[event];
					if (typeof this[method] === "function") {
						node.addEventListener(event, Core.bind(this[method], this));
					}
				}
				}
			}, instance);
		};
		// Add a node attach point in module instance using the following pattern: data-attach="property"
		// Attach points are available after postCreate call
		var core_bind_attach = function(/*Object*/instance, /*Node*/root) {
			var nodes = root.querySelectorAll("*[data-attach]");
			// Store all DOM Node reference in the $ object
			instance.$ = (typeof instance.$ === "object") ? instance.$ : {root: root};
			Core.forEach.call(nodes, function(/*Node*/node) {
				var attach = node.dataset.attach;
				this.$[attach] = node;
			}, instance);
		};
		// Initialize a Node which a data-module attribute
		var core_init_by_node = function(/*Node*/node) {
			var properties = node.dataset,
					module = properties.module,
					Class = core_modules[module];
			if (typeof Class === "function") {
				// Call module constructor
				var instance = new Class(properties, node);
				// Add event listener
				core_bind_method(instance, node);
				// Add Node attach point
				core_bind_attach(instance, node);
				// Module Life Cycle
				if (typeof instance.postCreate === "function") {
					instance.postCreate();
				}
				// Store instance in a global array
				core_modules_instances.push(instance);
			}
		};
		// Initialize module recursively in a DOM Tree
		var core_init_recursive = function(/*Document|Node*/root) {
			root = root || d; 
			// Generic module loader
			var nodes = root.querySelectorAll("*[data-module]");
			Core.forEach.call(nodes, core_init_by_node);
		};
		// Define modules namespace
		var core_modules = {};
		// Define modules instances list
		var core_modules_instances = [];

		/////////////////////////////////////////////////////////////////////////////////////
		//															Define public Core API
		/////////////////////////////////////////////////////////////////////////////////////

		// Provide basic function binding, ensure function execution in a specific context
		// Possible calls: Core.bing(this.method, this); OR Core.bing(this, "method");
		Core.bind = function(/*Function|Object*/fn, /*Object|String*/context) {
			var tmp, args, binding;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}
			if (typeof fn !== "function") {
				return undefined;
			}
			args = Core.slice.call(arguments, 2);
			binding = function() {
				return fn.apply(context, args.concat(Core.slice.call(arguments)));
			};
			return binding;
		};
		// Provide basic mixin function
		Core.mixin = function(/*Object*/base, /*Object*/extend) {
			core_mixin(base, extend);
		};
		// Alias on native Array.forEach
		Core.forEach = Array.prototype.forEach;
		// Alias on native Array.forEach
		Core.slice = Array.prototype.slice;
		// Parse DOM Node and initialize associated modules
		Core.parse = function(/*Node*/node) {
			// Determine valid method
			var init_method = node.hasAttribute("data-module") ? core_init_by_node : core_init_recursive;
			init_method(node);
		};
		// Set Core modules
		Core.modules = core_modules;
		// Set Core as global variable
		w.Core = Core;
		// Defered Core intialization to DOMContentLoaded event
		d.addEventListener("DOMContentLoaded", function() {
			// Initialize modules of current document 
			core_init_recursive();
		}, false);
}(this));