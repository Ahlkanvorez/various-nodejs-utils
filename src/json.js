#!/usr/bin/env node

import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export const getProperty = (filename, propString) => {
    return readFile(filename).then(contents => {
        let json = JSON.parse(contents);
        if (propString && propString.length > 0) {
            for (let prop of propString.split('.')) {
                json = json[prop];
            }
        }
        return json;
    }).catch(err => {
        console.error(err);
    });
}

const helpMessage =
`
    json.js, a utility for extracting particular members of a JSON file from the
             command line.

    Usage: ./json.js path/to/file.json some.member.path
        or node json.js path/to/file.json some.member.path

    Options:
        --help, -h
            Prints this message.
        
        json.member.path
            The desired sequence of accesses to get the data from JSON,
            separated by '.'
                ex. json.js package.json scripts
                    { build: 'babel src/ -d dist/' }
                ex. json.js package.json devDependencies.eslint
                    ^4.3.0
                ex. json.js file.json someArray.5
                    the value of someArray[5]
`;

if (process.argv && process.argv[1].match(/json\.js/)) {
    if (!process.argv[2]) {
        console.log(helpMessage);
    } else if ([ '--help', '-h' ].includes(process.argv[2])) {
        console.log(helpMessage);
    } else {
        getProperty(process.argv[2], process.argv[3])
            .then(console.log)
            .catch(console.error);
    }
}