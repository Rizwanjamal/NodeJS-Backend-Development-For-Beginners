const express = require('express');
const logger = require('./logger');
const app = express();
var router = express.Router();
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Template Engines
app.set('view engine', 'pug');
app.set('views', './template-views'); //default value './views'

// Custom Middlewares
app.use(logger);

router.use('/authors', authorRoutes);
router.use('/books', bookRoutes);
app.use(router);

// app.get('/', (req, res) => {
//     res.render('mainfile', {title: 'Rizwan Jamal', heading: 'Rizwan'})
// });

app.use((req, res) => {
    res.status(404).send({message: '404 No Matched Route Found !'})
})

app.use((err, req, res, next) => {
    res.status(400).send(err)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});