const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    authorID: {
        type: String,
        required: true
    },
    title : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    likes : {
        type: [String]
    }
})
module.exports = mongoose.model('Blog',blogSchema);