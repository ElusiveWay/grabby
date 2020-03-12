const config = require('./config')
const mongoose = require('mongoose')

module.exports = () =>  {
    return new Promise((res, rej) => {
        mongoose.Promise = global.Promise;
        mongoose.set('debug', true)
        mongoose.connection
            .on('error', error => rej(error))
            .on('close', () => console.log('DB connection closed'))
            .once('open', () => res(mongoose.connections[0]))
        mongoose.connect( config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }) 
    })
}