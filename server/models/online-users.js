
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    "id": {
        type: String,
        required: true,
        index: { unique: true }
    },
    "userName": {
        type: String,
        required: true,
        index: { unique: true }
    },
});

module.exports = mongoose.model('online-users', Schema);