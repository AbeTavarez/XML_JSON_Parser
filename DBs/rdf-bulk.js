`use strict`;

const dir = require('node-dir');
const parseRDF = require('./lib/parse-rdf');
const dirname = process.argv[2];

// Options
const optsObject = {
  match: /\.rdf$/, // match a;; rdf files
  exclude: ['pg0.rdf'], //ignore the template RDF file (ID = 0)
};

// wil read all (rdf) files from provided directory, but not template files
dir.readFiles(dirname, optsObject, (err, content, next) => {
  if (err) throw err;

  const doc = parseRDF(content);

  console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }));
  console.log(JSON.stringify(doc));
  next();
});

process.stdout.on('error', (err) => {
  if (err.code === 'EPIPE') {
    process.exit();
  }
  throw err;
});
