(function(w, undefined) {
	// Define sandboxed global variables
	var d = w.document,
			c = w.console,
			$ = w.jQuery;
	// Core.js global object
	var Core = w.Core || {};

	/////////////////////////////////////////////////////////////////////////////////////
	//														Define private Core methods
	/////////////////////////////////////////////////////////////////////////////////////

	// Provide native forEach wrapper using jQuery.each
	// Fix calling signature mistake in jQuery API
	var util_jQuery_forEach = function(callback, context) {
		var iterable = this,
				iterator = function(/*Integer*/index, /*Objet*/item){
					callback.call(this, item, index, iterable);
		};
		if (context) {
			iterator = Core.bind(iterator, context);
		}
		$.each(this, iterator);
	};
	// Basic mixin, extend base object with some extra properties
	// Bind to jQuery.extend
	var core_mixin = function(/*Object*/base, /*Object*/extend) {
		$.extend(base, extend);
	};
	// Add event listener using the following pattern: data-bind="{'event':'method'}"
	// The method scope is module instance
	var core_bind_method = function(/*Object*/instance, /*Node*/root) {
		var $root = $(root),
				$nodes = $root.find("*[data-method]");
		Core.forEach.call($nodes, function(/*Node*/node) {
			var $node = $(node),
					json = $node.data("method").replace(/\'/g, "\""),
					map = $.parseJSON(json),
					event = null;
			for (event in map) {
				if (map.hasOwnProperty(event)) {
					var method = map[event];
					if (typeof this[method] === "function") {
						$node.on(event, Core.bind(this, method));
					}
				}
				}
			}, instance);
		};
		// Add a node attach point in module instance using the following pattern: data-attach="property"
		// Attach points are available after postCreate call
		var core_bind_attach = function(/*Object*/instance, /*Node*/root) {
			var $root = $(root),
					$nodes = $root.find("*[data-attach]");
			// Store all DOM Node reference in the $ object
			instance.$ = (typeof instance.$ === "object") ? instance.$ : {root: root};
			Core.forEach.call($nodes, function(/*Node*/node) {
				var $node = $(node),
						attach = $node.data("attach");
				this.$[attach] = node;
			}, instance);
		};
		// Initialize a Node which a data-module attribute
		var core_init_by_node = function(/*Node*/node) {
			var $node = $(node),
					properties = $node.data(),
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
			var $root = root ? $(root) : $(d); 
			// Generic module loader
			var $nodes = $root.find("*[data-module]");
			Core.forEach.call($nodes, core_init_by_node);
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
		// Bind to jQuery.proxy
		Core.bind = $.proxy;
		// Provide basic mixin function
		Core.mixin = function(/*Object*/base, /*Object*/extend) {
			core_mixin(base, extend);
		};
		// Bind to internal jQuery forEach utility
		Core.forEach = util_jQuery_forEach;
		// Alias on native Array.forEach
		Core.slice = Array.prototype.slice;
		// Parse DOM Node and initialize associated modules
		Core.parse = function(/*Node*/node) {
			// Determine valid method
			var $node = $(node),
					init_method = $node.attr("data-module") ? core_init_by_node : core_init_recursive;
			init_method(node);
		};
		// Set Core modules
		Core.modules = core_modules;
		// Set Core as global variable
		w.Core = Core;
		// Defered Core intialization to DOMContentLoaded event
		$(function() {
			// Initialize modules of current document 
			core_init_recursive();
		}, false);
}(this));