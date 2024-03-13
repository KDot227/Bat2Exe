var JavaScriptObfuscator = require('javascript-obfuscator');
var fs = require('fs');

var code = fs.readFileSync(__dirname + "\\to_compile\\template.js", "utf8");

var obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    simplify: true,
    stringArray: false,
    stringArrayCallsTransform: false,
    stringArrayIndexShift: false,
    stringArrayRotate: false,
    stringArrayShuffle: false,
    stringArrayWrappersChainedCalls: false,
    target: 'node',
    transformObjectKeys: false,
    unicodeEscapeSequence: true
});

//create the file fn

fs.writeFileSync(__dirname + "\\to_compile\\main.js", obfuscationResult.getObfuscatedCode(), "utf8");