#!/usr/bin/env node

(() => {
    "use strict";

    const crypto = require('crypto');
    const https = require('https');

    let dictionary = [];
    let initLibrary = () => {
        // Type may be either 'hex' or 'words'.
        // If type is 'hex', length indicates the number of characters, and segmentLength indicates the
        //   number of characters before '-' demarcates a segment.
        // If type is 'words', length indicates the number of words to be concatenated to make a password.
        const password = (type, length, segmentLength) => {
            const hex = (length, segmentLength) => {
                const randomString = n => crypto.randomBytes(n).toString('hex').slice(0, n);
                const hyphenate = str => {
                    let result = '';
                    for (let i = 0; i < str.length; i += segmentLength) {
                        result += `${str.slice(i, i + segmentLength)}-`;
                    }
                    return result.slice(0, -1);
                }

                return hyphenate(randomString(length));
            };

            const words = count => {
                let result = '';
                for (let i = 0; i < count; ++i) {
                    result += dictionary[Math.floor(Math.random() * dictionary.length)];
                }
                return result;
            };

            switch(type) {
                case 'hex':
                    return hex(length, segmentLength);
                case 'words':
                    return words(length);
            }
        };

        module.exports.password = password;
    }

    const printPassword = () => {
        const type = process.argv[2];
        const length = Number(process.argv[3]);
        const segmentLength = process.argv.length > 3 ? Number(process.argv[4]) : undefined;

        console.log(module.exports.password(type, length, segmentLength));
    };
    
    const printHelp = () => {
        console.log(
`A NodeJS Password generator:
    Options:
        -h / help                       Shows this help message.

        hex length (segmentLength)      Generates and prints a random hex string of [length] characters,
                                        and if the optional [segmentLength] argument is provided, the hex
                                        string will have a '-' placed every [segmentLength] characters:
                                            ex. > password hex 6 3
                                                9ad-fd2

        words count                     Generates and prints a password consisting of [count] random words
                                        concatenated together. If [count] is 1, then a single random word
                                        is printed.
                                            ex. > password words 1
                                                piece
`);
    };

    const handleInput = () => {
        if (process.argv[2] === '-h' || process.argv[2] === 'help') {
            printHelp();
        } else {
            printPassword();
        }
    };

    // TODO: Make your own word list incase this one ever gets deleted.
    let str = '';
    https.get('https://gist.githubusercontent.com/deekayen/4148741/raw/01c6252ccc5b5fb307c1bb899c95989a8a284616/1-1000.txt',
        res => {
            res.on('data', chunk => {
                str += chunk;
            });
            res.on('end', () => {
                dictionary = str.split('\n');

                // initLibrary will always complete before the password is printed.
                process.nextTick(initLibrary);

                if (process.argv.length > 2) {
                    setImmediate(handleInput);
                }
            });
        }
    );


})();