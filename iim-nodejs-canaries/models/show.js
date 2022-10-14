const mongoose = require('mongoose');
const Schema = mongoose.Schema

const showSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
})

const Show = mongoose.model('Show', showSchema);
module.exports = Show;