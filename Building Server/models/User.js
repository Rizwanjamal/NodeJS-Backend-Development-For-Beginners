const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { 
        type: String, 
        required: true
    },
    lastName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    hash: { 
        type: String, 
        required: true
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
}, { versionKey: false });

module.exports = mongoose.model('User', schema);