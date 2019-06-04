const express = require('express');

const app = express();

let books = [{
    id: 1,
    name: 'A Smarter Way To Learn Javascript'
}, {
    id: 2,
    name: 'A Smarter Way To Learn Python'
}];

app.get('/', (req, res) => {
    res.send('Hello World !');
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});