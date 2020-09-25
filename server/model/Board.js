const mongoose = require('mongoose');
const borderSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        maxlength: 50
    },
    contents: {
        type: String
    },
    author: {
       type: String
    },
    reg_date: {
        type: Date,
        default: Date.now()
    }
})

let Board = mongoose.model('Board', borderSchema)
module.exports = {Board}