#!/usr/bin/env node

const fs = require('fs');
// Parser
const parseRDF = require('./lib/parse-rdf');
// File
const rdf = fs.readFileSync(process.argv[2]);
//Parsing...
const book = parseRDF(rdf);

//* Logs Data Object with indentations
console.log(JSON.stringify(book, null, ' '));
