var express = require('express');
var router = express.Router();
var bookService = require('../services/book');


/* GET ALL BOOKS */
router.get('/', bookService.getBooks);

/* GET SINGLE BOOK BY ID */
router.get('/:id', bookService.getBook);

/* SAVE BOOK */
router.post('/', bookService.createBook);

/* UPDATE BOOK */
router.put('/:id', bookService.updateBook);

/* DELETE BOOK */
// router.delete('/:id', bookService.deleteBook);


module.exports = router;