define([
       'test',
       './relative/folder/test',
       'module/here', 'on/same/line',
       'noVar'
], function(test, relativeFolder, someModule, sameLine) {

    test.doSomething();

    relativeFolder();

});
