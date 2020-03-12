const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required:true
        },
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }

    })
module.exports = mongoose.model('im-items', schema)