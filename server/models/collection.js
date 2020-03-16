const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        descript: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required:false
        },
        adds: {
            type: String,
            required: false
        },
        author: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }

    })
module.exports = mongoose.model('im-collection', schema)