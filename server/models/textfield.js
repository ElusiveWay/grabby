const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
        ano: {
            type: String,
            required: true
        },
        gui: {
            type: String,
            required: true
        },
        guimark: {
            type: Boolean,
            required: true
        },
        anomark: {
            type: Boolean,
            required: true
        },
    })
module.exports = mongoose.model('im-textfields', schema)