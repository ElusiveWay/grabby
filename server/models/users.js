const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        },
        online: {
            type: Boolean
        },
        isBlocked: {
            type: Boolean
        },
        isAdmin: {
            type: Boolean
        }
    }
)
module.exports = mongoose.model('im-users', schema)