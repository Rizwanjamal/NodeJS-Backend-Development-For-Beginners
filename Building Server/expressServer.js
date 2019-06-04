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

app.get('/books', (req, res) => {
    console.log('query :', req.query);
    res.send(books);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});