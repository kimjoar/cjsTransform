var _ = require('underscore'),
    fs = require("fs");

module.exports = function(from, to) {
    if (!to) to = from;
    var input = fs.readFileSync(from, "utf8");

    //                                    dependencies                    names
    var matches = input.match(/define\(\s*\[([^\]]+)\s*\],\s*function\s*\(([^\)]+)\)\s*{/);

    if (!matches) return false;

    var dependencies = matches[1].split(","),
        names = matches[2].split(","),
        cjs = input.replace(matches[0], createCjsDefine(names, dependencies));

    fs.writeFileSync(to, cjs, "utf8");

    return true;
};

var createCjsDefine = function(names, dependencies) {
    var indent = "    ",
        commonJsDefine = "define(function(require) {\n\n" + indent,
        commonJsRequires = _.map(dependencies, function(dependency, i) {
            return commonJsRequireForDependency(dependency, names[i]);
        });

    return commonJsDefine + commonJsRequires.join("\n" + indent);
}

var commonJsRequireForDependency = function(dependency, name) {
    var req = "require(" + dependency.trim() + ");";
    if (name) return "var " + name.trim() + " = " + req;
    return req;
};
