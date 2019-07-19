var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new mongoose.Schema({
    isbn: String,
    title: String,
    author: {
        type:Schema.Types.ObjectId,
        ref: 'Author'
    },
    publisher: String,
    price: Number,
    created_at: { type: Date, default: Date.now }
}, { versionKey: false })

module.exports = mongoose.model('Book', BookSchema); 