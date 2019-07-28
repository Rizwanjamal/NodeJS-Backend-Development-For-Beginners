const joi = require('@hapi/joi');
const db = require('../db');
const Author = db.Author;

// Fetch Request Query Parameters With req.query
// Usage: http://localhost:3000/books?sortBy=date
const getAuthors = async (req, res) => {
    const authors = await Author.find();
    res.json(authors);
};

// Fetch Request Parameters With req.params
// Usage: http://localhost:3000/books/2
const getAuthor = async (req, res, next) => {
    console.log('id :', req.params);
    const author = await Author.findById(req.params.id);
    if (!author) return next({message: 'No user found !'})
    res.json(author);
};

// Add New Book With Validations
const createAuthor = async (req, res, next) => {
    console.log('body :', req.body);
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    return Author.create(req.body, (err, data) => {
        if (err) return next(err);
        res.json(data)
    })
}


// Add Book With Validations
const updateAuthor = (req, res) => {
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
        name: joi.string().min(3).max(30).required(),
        ranking: joi.number(),
        total_books: joi.number(),
        awards: joi.number()
    }
    return joi.validate(data, schema);
};

module.exports = {
    getAuthors: getAuthors,
    getAuthor: getAuthor,
    createAuthor: createAuthor,
    updateAuthor: updateAuthor
};