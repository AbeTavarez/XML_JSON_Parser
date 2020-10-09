`use strict`;
const fs = require('fs');
const parseRdf = require('../lib/parse-rdf');
const expect = require('chai').expect;
const parseRDF = require(`../lib/parse-rdf`);
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

describe('parseRDF', () => {
  it(`should be a function`, () => {
    expect(parseRDF).to.be.a(`function`);
  });

  it(`should parse RDF content`, () => {
    const book = parseRdf(rdf);
    expect(book).to.be.an(`object`);
    expect(book).to.have.a.property('id', 132);
    expect(book).to.have.a.property('title', 'The Art of War');
    expect(book)
      .to.have.a.property('authors')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Sunzi, active 6th century B.C.')
      .and.contains('Giles, Lionel');
    expect(book)
      .to.have.a.property('subjects')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Military art and science -- Early works to 1800')
      .and.contains('War -- Early works to 1800');
  });
});
