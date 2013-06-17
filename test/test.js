var fs = require('fs');
var cjsTransform = require('../index');
var tmpFile = __dirname + '/tmp.js';

exports.setUp = exports.tearDown = function(done) {
    if (fs.existsSync(tmpFile)) {
        fs.unlinkSync(tmpFile);
    }
    done();
};

exports.testDoesNothingWhenNoDeps = function(test) {
    test.ok(!cjsTransform(__dirname + '/cases/noDeps.js', tmpFile));
    test.done();
};

exports.testTransformsWhenOneDep = function(test) {
    var from = __dirname + '/cases/oneDep.js';
    var to = __dirname + '/cases/oneDepRes.js';

    test.ok(cjsTransform(from, tmpFile));

    var toContent = fs.readFileSync(to, 'utf8');
    var tmpContent = fs.readFileSync(tmpFile, 'utf8');

    test.equal(toContent, tmpContent);
    test.done();
};

exports.testTransformsWhenManyDeps = function(test) {
    var from = __dirname + '/cases/manyDeps.js';
    var to = __dirname + '/cases/manyDepsRes.js';

    test.ok(cjsTransform(from, tmpFile));

    var toContent = fs.readFileSync(to, 'utf8');
    var tmpContent = fs.readFileSync(tmpFile, 'utf8');

    test.equal(toContent, tmpContent);
    test.done();
};
