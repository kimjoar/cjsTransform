define(function(require) {

    var test = require('test');
    var relativeFolder = require('./relative/folder/test');
    var someModule = require('module/here');
    var sameLine = require('on/same/line');
    require('noVar');

    test.doSomething();

    relativeFolder();

});
