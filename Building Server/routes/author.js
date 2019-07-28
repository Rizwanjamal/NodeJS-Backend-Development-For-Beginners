var express = require('express');
var router = express.Router();
var authorService = require('../services/author');

/* GET ALL AUTHORS */
router.get('/', authorService.getAuthors);

/* GET SINGLE AUTHOR BY ID */
router.get('/:id', authorService.getAuthor);

/* SAVE AUTHOR */
router.post('/', authorService.createAuthor);

/* UPDATE AUTHOR */
router.put('/:id', authorService.updateAuthor);

/* DELETE AUTHOR */
// router.delete('/:id', authorService.deleteAuthor);


module.exports = router;