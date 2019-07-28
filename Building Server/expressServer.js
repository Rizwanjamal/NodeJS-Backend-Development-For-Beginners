const express = require('express');
const logger = require('./logger');
const app = express();
var router = express.Router();
const authorRoutes = require('./routes/author');
const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/User');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
const config = require('./config.json');
const jwt = require('express-jwt');

// Template Engines
app.set('view engine', 'pug');
app.set('views', './template-views'); //default value './views'

// Custom Middlewares
app.use(logger);

router.use('/authors', jwt({secret: config.secret}), authorRoutes);
router.use('/books', jwt({secret: config.secret}), bookRoutes);
router.use('/users', userRoutes);
app.use(router);

// app.get('/', (req, res) => {
//     res.render('mainfile', {title: 'Rizwan Jamal', heading: 'Rizwan'})
// });

app.use((req, res) => {
    res.status(404).send({message: '404 No Matched Route Found !'})
})

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        return res.status(401).send('Invalid Token')
    }
    res.status(400).send(err)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Running At Port ${port}`)
});