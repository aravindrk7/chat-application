
const mongoose = require('mongoose');

const messages = mongoose.Schema({
    from: String,
    to: String,
    text: String,
    image: String,
    audio: String,
    type: String,
    time: String
});

const Schema = mongoose.Schema({
    "userName": {
        type: String,
        required: true
    },
    "messages": [messages]

}
);

module.exports = mongoose.model('user-messages', Schema);