/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-10T22:26:47+00:00
 */



const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: String
});

const PublisherSchema = new mongoose.Schema({
  name: String
});

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  authors: {
    type: [AuthorSchema],
    required: true
  },
  publishers: {
    type: [PublisherSchema],
    required: true
  }
});

const Book = mongoose.model('books', BookSchema);

module.exports = Book;
