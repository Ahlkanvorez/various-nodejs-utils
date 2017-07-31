# Various NodeJS Utils

The purpose of this library is to provide various useful command-line functions in NodeJS, with the option to use them as libraries in NodeJS applications. This is not a complete suite of utilities; it is merely a collection of scripts I found useful and wrote in NodeJS for the experience.

## What's included?

### password.js

A tool for generating passwords of two flavors: hex-strings with optional segmentation marked by dashes (ex. "abc-123-def-456"), or several english words concatenated without spaces inbetween (ex. "turkeycheddarbaconburger").

The type of password is specified as the first argument, "hex" or "words", then the desired length of the password is specified (length in characters not including dashes if "hex", or number of words if "words"), and lastly, if "hex" was chosen, the number of characters in each segment. If the last parameter is not provided, the resulting hex string will be segmented into three-character segments separated by dashes.

    ex. > ./password.js hex
        3fb-e80
        > ./password.js hex 12 4
        bf41-7bbc-b8b6
        > ./password.js words 3
        reasonflowerdrink

These functions can be imported as follows:

    import nodeUtils from 'various-nodejs-utils';

    const { password, hex, words } = nodeUtils.password;

    // if type is 'hex', this calls
    //   hex(type, segmentLength),
    // if type is 'words', this calls
    //   words(length, dictionary);
    password(type, length, segmentLength, dictionary);

    hex(length, segmentLength);

    words(count, dictionary);

### json.js

A simplistic command-line tool for printing certain members of a JSON file. The JSON filename or path is provided as the first argument, and then a sequence of member names separated by periods. If no member name sequence is provided, it will print the whole JSON file.

    ex. > ./json.js package.json scripts
        { build: 'babel src/ -d dist/' }
        > ./json.js package.json devDependencies.eslint
        ^4.3.0
        > ./json.js file.json someArray.5
        the value of someArray[5]

To use this script in NodeJS, import it as follows:

    import { json } from 'various-nodejs-utils';

    json.getProperty(filename, propSequenceString);