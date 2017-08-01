#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _crypto = require('crypto');

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dict = [];

var hex = function hex() {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    return function () {
        var segmentLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

        var randomString = function randomString(n) {
            return (0, _crypto.randomBytes)(n).toString('hex').slice(0, n);
        };
        var hyphenate = function hyphenate(str) {
            var result = '';
            for (var i = 0; i < str.length; i += segmentLength) {
                result += str.slice(i, i + segmentLength) + '-';
            }
            return result.slice(0, -1);
        };
        return hyphenate(randomString(length));
    };
};

var words = function words() {
    var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var dictionary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dict;

    var result = '';
    for (var i = 0; i < count; ++i) {
        result += dictionary[Math.floor(Math.random() * dictionary.length)];
    }
    return result;
};

// Type may be either 'hex' or 'words'.
// If type is 'hex', length indicates the number of characters, and
//   segmentLength indicates the number of characters before '-' demarcates
//   a segment.
// If type is 'words', length indicates the number of words to be
//  concatenated to make a password.
var password = function password(type, length, segmentLength, dictionary) {
    switch (type) {
        case 'hex':
            return hex(length)(segmentLength);
        case 'words':
            return words(length, dictionary);
    }
};

var printPassword = function printPassword() {
    var _process = process,
        argv = _process.argv;

    var type = argv[2];
    var length = argv.length > 3 ? Number(argv[3]) : undefined;
    var segmentLength = argv.length > 4 ? Number(argv[4]) : undefined;

    console.log(password(type, length, segmentLength));
};

var printHelp = function printHelp() {
    console.log('A NodeJS Password generator:\nOptions:\n    -h, --help\n        Shows this help message.\n\n    hex (length) (segmentLength)\n        Generates and prints a random hex string of [length] characters,\n        and if the optional [segmentLength] argument is provided, the hex\n        string will have a \'-\' placed every [segmentLength] characters. If\n        no arguments are provided, it is equivalent to hex 6 6.\n            ex. > password hex 6 3\n                9ad-fd2\n\n    words (count)\n        Generates and prints a password consisting of [count] random words\n        concatenated together. If [count] is 1, or not provided, then a\n        single random word is printed.\n            ex. > password words\n                piece\n');
};

var handleInput = function handleInput() {
    if (['-h', '--help'].includes(process.argv[2])) {
        printHelp();
    } else {
        printPassword();
    }
};

// TODO: Make your own word list incase this one ever gets deleted.
var str = '';
_https2.default.get('https://gist.githubusercontent.com/deekayen/4148741/raw/01c6252ccc5b5fb307c1bb899c95989a8a284616/1-1000.txt', function (res) {
    res.on('data', function (chunk) {
        str += chunk;
    });
    res.on('end', function () {
        dict = str.split('\n');

        if (process.argv.length > 2) {
            setImmediate(handleInput);
        }
    });
});

exports.default = { hex: hex, words: words, password: password };