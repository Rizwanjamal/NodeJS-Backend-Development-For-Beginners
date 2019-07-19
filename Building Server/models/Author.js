const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    name : String,
    ranking : Number,
    total_books : Number,
    awards : Number
}, { versionKey: false })

module.exports = mongoose.model('Author', AuthorSchema);