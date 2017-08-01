#!/usr/bin/env node

import { randomBytes } from 'crypto';
import https from 'https';

let dict = [];

const hex = (length = 6) => (segmentLength = 3) => {
    if (segmentLength <= 0) {
        segmentLength = 3;
    }
    if (length <= 0) {
        length = 6;
    }
    const randomString = n => randomBytes(n).toString('hex').slice(0, n);
    const hyphenate = str => {
        let result = '';
        for (let i = 0; i < str.length; i += segmentLength) {
            result += `${str.slice(i, i + segmentLength)}-`;
        }
        return result.slice(0, -1);
    };
    return hyphenate(randomString(length));
};

const words = (count = 1, dictionary = dict) => {
    let result = '';
    for (let i = 0; i < count; ++i) {
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
const password = (type, length, segmentLength, dictionary) => {
    switch (type) {
        case 'hex':
            return hex(length)(segmentLength);
        case 'words':
            return words(length, dictionary);
    }
};

const printPassword = () => {
    const { argv } = process;
    const type = argv[2];
    const length = (argv.length > 3) ? Number(argv[3]) : undefined;
    const segmentLength = (argv.length > 4) ? Number(argv[4]) : undefined;

    console.log(password(type, length, segmentLength));
};

const printHelp = () => {
    console.log(
`A NodeJS Password generator:
Options:
    -h, --help
        Shows this help message.

    hex (length) (segmentLength)
        Generates and prints a random hex string of [length] characters,
        and if the optional [segmentLength] argument is provided, the hex
        string will have a '-' placed every [segmentLength] characters. If
        no arguments are provided, it is equivalent to hex 6 6.
            ex. > password hex 6 3
                9ad-fd2

    words (count)
        Generates and prints a password consisting of [count] random words
        concatenated together. If [count] is 1, or not provided, then a
        single random word is printed.
            ex. > password words
                piece
`);
};

const handleInput = () => {
    if ([ '-h', '--help' ].includes(process.argv[2])) {
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
            dict = str.split('\n');

            if (process.argv.length > 2) {
                setImmediate(handleInput);
            }
        });
    }
);

export default { hex, words, password };
