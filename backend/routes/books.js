/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-16T05:37:25+00:00
 */

const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);

let Book = require('../models/Book');

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

router.route('/').get((req, res) => {
  Book.find()
       .then(books => res.json(books))
       .catch(err => res.status(400).json('Error: ' + err));

});

router.route("/:id").get((req, res) => {
  const bookId = req.params.id;

  Book.findById(bookId)
       .then(result => {
            if(!result) {
                return res.status(404).json({
                    message: "Book not found with id " + bookId
                });
            }
            res.json(result);
       })
       .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).json({
                    message: "Book not found with id " + bookId
                });
            }
            return res.status(500).json({
                message: "Error retrieving book with id " + bookId
            });
       });

});

router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const movie = req.body;

  const book = req.body;
  //validate book
  if(token){
  if(!book.title) {
      return res.status(400).json({
          message: "Book title can not be empty"
      });
  }

  const newBook = new Book(book);

  newBook.save()
          .then(data => {
            res.json(data);
          })
          .catch(err => res.status(400).json('Error: ' + err));
    } else {
      return res.status(403).json({success: false, message: 'Unauthorized.'});
    }
});

router.route("/:id").put(passport.authenticate('jwt', {session: false }), (req, res) => {
  const token = getToken(req.headers);
  const bookId = req.params.id;
  const newBook = req.body;

  const {authors, publishers} = req.body;

  if (token) {
    if(!newBook.title) {
        return res.status(400).json({
            message: "Book title can not be empty"
        });
    }

    // Find book and update it with the request body
    Book.findByIdAndUpdate(bookId, newBook, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).json({
                message: "Book not found with id " + bookId
            });
        }

        console.log(book);

        res.json(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message: "Book not found with id " + bookId
            });
        }
        return res.status(500).json({
            message: "Error updating book with id " + bookId
        });
    });
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized'});
  }
});

router.route("/:id").delete((req, res) => {
  const bookId = req.params.id;

  Book.findByIdAndRemove(bookId)
      .then(book => {
          if(!book) {
              return res.status(404).json({
                  message: "Book not found with id " + bookId
              });
          }
          res.json({message: "Book deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).json({
                  message: "Book not found with id " + bookId
              });
          }
          return res.status(500).send({
              message: "Could not delete book with id " + bookId
          });
      });
});


module.exports = router;
