const express = require('express');
const joi = require('@hapi/joi');
const logger = require('./logger');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Template Engines
app.set('view engine', 'pug');
app.set('views', './template-views'); //default value './views'

// Custom Middlewares

app.use(logger);

app.use((req, res, next) => {
    console.log('Second Middleware');
    next();
});

let books = [{
    id: 1,
    name: 'A Smarter Way To Learn Javascript'
}, {
    id: 2,
    name: 'A Smarter Way To Learn Python'
}];

app.get('/', (req, res) => {
    // res.send('Hello World !');
    res.render('mainfile', {title: 'Rizwan Jamal', heading: 'Rizwan'})
});

// Fetch Request Query Parameters With req.query
// Usage: http://localhost:3000/books?sortBy=date
app.get('/books', (req, res) => {
    console.log('query :', req.query);
    res.send(books);
});

// Fetch Request Parameters With req.params
// Usage: http://localhost:3000/books/2
app.get('/books/:id', (req, res) => {
    console.log('id :', req.params);
    const book = books.find( b => b.id === parseInt(req.params.id));
    res.send(book);
});

// Add New Book With Validations
app.post('/books', (req, res) => {
    console.log('body :', req.body);
    const { error } = validatePayload(req.body);
    const book = {
        id: books.length + 1,
        name: req.body.name 
    };
    if (error) return res.status(400).send(error.details[0].message);
    books.push(book);
    res.send(book);
})


// Add Book With Validations
app.put('/books/:id', (req, res) => {
    const book = books.find( book => book.id === parseInt(req.params.id));
    if (!book) return res.status(400).send('Book Not Found ! Please provide a valid ID')
    const { error } = validatePayload(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    book.name = req.body.name;
    res.send(book)
}) 

// Validate Payload Functionality
const validatePayload = (data) => {
    const schema = {
        name: joi.string().min(3).max(30).required()
    }
    return joi.validate(data, schema);
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});