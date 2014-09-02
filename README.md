core.js 0.6.0 [![Build Status](https://travis-ci.org/ghoullier/core.js.png?branch=master)](https://travis-ci.org/ghoullier/core.js)
==================================================

> Project is no longer supported

core.js is a lightweight (<5Kb) toolbelt for ES5+ browser with CommonJS API

Features
--------------------------------------
- Dom utilities
- Class system
- Controller
- Markup driven event delegation
- Micro templating
- CommonJS API

Get started
--------------------------------------
```sh
npm install -g grunt-cli
npm install && grunt
```

Using core.js
--------------------------------------

Build your customized application file
```sh
browserify app.js -o app.build.js
```

Include your application file in your page
```html
<script src="app.build.js"></script>
```

Javascript Part (app.js)
--------------------------------------

Define a new module with the following structure
```javascript
var manager = require('./core/manager')
  , Controller = require('./core/controller')
manager.add('Main', Controller.extend({
  action: function() {
    console.log('action')
  }
}))
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
- v0.7.0: Utilitaires AJAX
- v0.8.0: Routing
- v0.9.0: Storage cookie

Changelog
--------------------------------------
- v0.6.0: Support de l'API CommonJS
- v0.5.0: Mise en place d'un mécanisme de micro-templating
- v0.4.0: Amélioration du gestionnaire d'évènements des controllers
- v0.3.0: Mise en place des tests unitaires via Mocha
- v0.2.0: Intégration de l'outil de build grunt
