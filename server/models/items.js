const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: false
        },
        id: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        collect: {
            type: String,
            required:true
        },
        type: {
            type: Number,
            required: false
        },
        likes: {
            type: Number,
            required: false
        },
        add: {
            type: String,
            required: false
        },
        tags: {
            type: String,
            required: false
        },
        comments: {
            type: String,
            required: false
        }
    })
module.exports = mongoose.model('im-items', schema)