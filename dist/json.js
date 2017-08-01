#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = (0, _util.promisify)(_fs2.default.readFile);

// Note: This returns a Promise which passes the json into then(...)
var getProperty = function getProperty(filename, propString) {
    return readFile(filename).then(function (contents) {
        var json = JSON.parse(contents);
        if (propString && propString.length > 0) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = propString.split('.')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    json = json[prop];
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        return json;
    }).catch(function (err) {
        console.error(err);
    });
};

var helpMessage = '\n    json.js, a utility for extracting particular members of a JSON file from the\n             command line.\n\n    Usage: ./json.js path/to/file.json some.member.path\n        or node json.js path/to/file.json some.member.path\n\n    Options:\n        --help, -h\n            Prints this message.\n        \n        json.member.path\n            The desired sequence of accesses to get the data from JSON,\n            separated by \'.\'\n                ex. > ./json.js package.json scripts\n                    { build: \'babel src/ -d dist/\' }\n                ex. > ./json.js package.json devDependencies.eslint\n                    ^4.3.0\n                ex. > ./json.js file.json someArray.5\n                    the value of someArray[5]\n';

if (process.argv && process.argv.length > 2 && process.argv[1].match(/json\.js/)) {
    if (!process.argv[2]) {
        console.log(helpMessage);
    } else if (['--help', '-h'].includes(process.argv[2])) {
        console.log(helpMessage);
    } else {
        getProperty(process.argv[2], process.argv[3]).then(console.log).catch(console.error);
    }
}

exports.default = { getProperty: getProperty };