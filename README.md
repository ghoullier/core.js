core.js Documentation
==================================================

A lightweight toolbelt

Get started
--------------------------------------
```sh
npm install -g grunt-cli
npm install && grunt
```


Using core.js
--------------------------------------

Include core.js file in the end of your body
```html
<script src="dist/core.js"></script>
```


Javascript Part
--------------------------------------

Define a new module with the following structure
```javascript
;(function(root, doc, core) {
  core.controllers.add('Main', core.BaseController.extend({
    action: function() {
      console.log('action')
    }
  }))
}(this, this.document, this.core))
```

HTML Part
--------------------------------------
```html
<div data-controller="Main">
  <button data-method="action">action</button>
</div>
```
