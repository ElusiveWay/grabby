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
mongoose.set('debug',false);
const ObjectId = mongoose.Types.ObjectId 
const pino = require('express-pino-logger')();
const cors = require('cors')
const users = require('./models/users')
var cPsO = require('socket.io-cookie')
//                      PRESETTINGS

//SYNC

//
var http = require('http').createServer(app);
var io = require('socket.io')(http, {cookie : false});
io.on('connection', function(socket){
    socket.on('sync', async (r)=>{
      if (session.signed.some(v=>v==r.cookies)) {
            let usr
            await users.find({_id : r.cookies }).then( p=>{
            usr = p[0]}).catch(e=>socket.emit('sync', {sess : session.signed}))
            socket.emit('sync', {sess : session.signed , user : usr})
      }
      else{
          socket.emit('sync', {sess : session.signed})

      }
    });
  });
//
//React view engine


// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine({transformViews : true, beautify : true}));


//
app.use(express.static(path.join(__dirname,'../build')))  



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
//
//REACT ROUTING
app.get('/api/home', (req, res) => {
  let usr
  if (req.cookies.key && session.signed.some(v=>v==req.cookies.key)){
      users.find({_id : req.cookies.key}).then(p=>{
      usr = p[0]
      res.json({ user: usr || {}, signed : session.signed , key : req.cookies.key });
    })
  }
  
});
app.get('/*', (req,res)=>{
  res.sendfile(path.join(__dirname, '../build/index.html'));
})
app.use(pino);

//                      PRESETTINGS END
//routing pages
const signinRoute = require('./routers');
app.use('/', signinRoute);

// //socket.io
// io.on('connection', function(socket){
//     //socket inside
// });

module.exports = http