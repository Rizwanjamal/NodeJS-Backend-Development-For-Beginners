const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.log('Not Connected =>', err)
    })
mongoose.Promise = global.Promise;

module.exports = {
    Author: require('./models/Author'),
    Book: require('./models/Book'),
    User: require('./models/User')
};