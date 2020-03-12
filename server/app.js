// app.get('/api/greeting', (req, res) => {
//   const name = req.query.name || 'World';
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

//                      DEPENDENCIES
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId 
const pino = require('express-pino-logger')();
const cors = require('cors')

//                      PRESETTINGS

//socket
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('disconnect', function(){
//       console.log('user disconnected');
//     });
//   });
//
//React view engine


// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine({transformViews : true, beautify : true}));


//
app.use(express.static(path.join(__dirname,'./public')))  
app.get('*', (req,res)=>{
  res.sendfile(path.join(__dirname, '/public/index.html'));
})
app.use(pino);

app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())


//Session + cookie initialization
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser())
app.use(session({
    resave : true,
    saveUninitialized : true,
    secret: 'keyboardCat',
    cookie : {maxAge: 1200000,secure: true}
  }));
//Render main page, try to find users in DB 
    global.session = session
    session.signed = []


//                      PRESETTINGS END
//routing pages
const signinRoute = require('./routers');
app.use('/', signinRoute);

// //socket.io
// io.on('connection', function(socket){
//     //socket inside
// });

module.exports = http