const joi = require('@hapi/joi');
const db = require('../db');
const Book = db.Book;

// Fetch Request Query Parameters With req.query
// Usage: http://localhost:3000/books?sortBy=date
const getBooks = async (req, res, next) => {
    console.log('user :', req.user);
    Book.find()
    .populate('author')
    .then((books) => {
        res.json(books)
    }).catch((err) => {
        return next(err)
    })
};

// Fetch Request Parameters With req.params
// Usage: http://localhost:3000/books/2
const getBook = async (req, res) => {
    console.log('id :', req.params);
    const book = await Book.findById(req.params.id);
    if (!book) return next({message: 'No Book Found !'})
    res.json(book);
};

// Add New Book With Validations
const createBook = async (req, res) => {
    console.log('body :', req.body);
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    return Book.create(req.body, (err, data) => {
        if (err) return next(err);
        res.json(data)
    })
}


// Add Book With Validations
const updateBook = (req, res) => {
    const book = books.find( book => book.id === parseInt(req.params.id));
    if (!book) return res.status(400).send('Book Not Found ! Please provide a valid ID')
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    book.name = req.body.name;
    res.send(book)
}

// Validate Payload Functionality
const validatePayload = (data) => {
    const schema = {
        isbn: joi.string(),
        title: joi.string().min(3).max(50).required(),
        author: joi.string(),
        publisher: joi.string(),
        price: joi.number()
    }
    return joi.validate(data, schema);
};

module.exports = {
    getBooks: getBooks,
    getBook: getBook,
    createBook: createBook,
    updateBook: updateBook
};