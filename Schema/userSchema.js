const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    blogs: {
        type: [String],
        required: false
    }
})

module.exports = mongoose.model('User2',userSchema);