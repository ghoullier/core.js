core.js 0.5.0 [![Build Status](https://travis-ci.org/ghoullier/core.js.png?branch=master)](https://travis-ci.org/ghoullier/core.js)
==================================================

core.js is a lightweight (<5Kb) toolbelt for ES5+ browser

Features
--------------------------------------
- Dom utilities
- Class system
- Controller
- Markup driven event delegation
- Micro templating

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
  <button data-on data-on-click="action">Click Me !!</button>
</div>
```

Roadmap
--------------------------------------
- v0.6.0: Utilitaires AJAX
- v0.7.0: Routing
- v0.8.0: Storage cookie

Changelog
--------------------------------------
- v0.5.0: Mise en place d'un mécanisme de micro-templating
- v0.4.0: Amélioration du gestionnaire d'évènements des controllers
- v0.3.0: Mise en place des tests unitaires via Mocha
- v0.2.0: Intégration de l'outil de build grunt
