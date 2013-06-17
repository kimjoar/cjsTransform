Transform Require.js modules to use simplified CommonJS wrapper
---------------------------------------------------------------

I prefer to use the [simplified CommonJS wrapper](http://requirejs.org/docs/api.html#cjsmodule)
when using [Require.js](http://requirejs.org/).

This module transforms the following:

```javascript
define([
       'test',
       './relative/folder/test',
       'module/here', 'on/same/line',
       'noVar'
], function(test, relativeFolder, someModule, sameLine) {

    test.doSomething();

    relativeFolder();

});
```

into:

```javascript
define(function(require) {

    var test = require('test');
    var relativeFolder = require('./relative/folder/test');
    var someModule = require('module/here');
    var sameLine = require('on/same/line');
    require('noVar');

    test.doSomething();

    relativeFolder();

});
```

API
---

```javascript
var cjsTransform = require('cjs-transform');

var isTransformed = cjsTransform(from[, to]);

// if `to` is not specified, it changes `from`
// there is no async version
```
