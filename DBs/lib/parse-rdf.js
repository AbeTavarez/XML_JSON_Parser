`use strict`;

const cheerio = require('cheerio');

module.exports = (rdf) => {
  //* Parse the rdf content
  const $ = cheerio.load(rdf);

  //* Book Object
  const book = {};

  /* Extract the book ID and format it
   * 1- setsthe book id
   * 2- Unary casts the resultas a number
   * 3- Query for the <pgterms:ebook> tag
   * 4-Get the value of the rdf:about attribute
   * 5-Strip  off the leading 'ebooks/' substring
   */
  book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', ' ');

  //* selects tag and save it as text
  book.title = $('dcterms\\:title').text();

  //* extract authors
  book.authors = $('pgterms\\:agent pgterms\\:name')
    .toArray()
    .map((el) => $(el).text());

  //* extracts subjects
  book.subjects = $('[rdf\\:resource$="/LCSH"]')
    .parent()
    .find('rdf\\:value')
    .toArray()
    .map((el) => $(el).text());

  return book;
};
