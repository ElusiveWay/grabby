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
const items = require('./models/items')
const textfields = require('./models/textfield')
const collection = require('./models/collection')
const cookieEncrypter  = require('cookie-encrypter')
const request = require('request');
var cloudinary = require('cloudinary').v2;

//                      PRESETTINGS

 //uppload from fileBuffer
 cloudinary.config({ 
  cloud_name: 'dete2z5hu', 
  api_key: '899217872126318', 
  api_secret: '90i6qUElzHDe4f-RRTbH3feJgMo' 
});
//and promisse
function uploadToCloudinary(image) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream((err, url) => {
      if (err) return reject(err)
      return resolve(url)
    }).end(image)
  });
} 
//React view engine

app.use(express.static(path.join(__dirname,'../build')))  


//Session + cookie initialization

app.set('trust proxy', 1)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
const cookieParser = require('cookie-parser')
const session = require('express-session')

const SecretKey = 'whitemothwhitemothwhitemothwhite'
app.use(cookieParser(SecretKey))
app.use(cookieEncrypter(SecretKey))
app.use(session({
    proxy:true,
    httpOnly: true,
    secret: 'whitemoth',
    cookie : {maxAge: 1200000, secure: false}
  }));
//Render main page, try to find users in DB 
    global.session = session
    session.signed = []
//
//REACT ROUTING
app.use(cors())

app.post('/changeColor', async(req,res)=>{
  if (req.cookies.key === req.body.user) {
    await users.updateOne({_id : req.body.user}, {theme: req.body.theme}, e=>e)
    res.send('ok')
  }
  else{
    res.send('neok')
  }
})
app.post('/like', async(req,res)=>{
  if (session.signed.every(v=>v!=req.body.likerId)){return}
  await items.find({_id : req.body.itemId}).then(async r2=>{
    let likes = JSON.parse(r2[0].likes).map(v=>v)
    if (likes.some(w=>w==req.body.liker)){
      likes.splice(likes.indexOf(req.body.liker),1)
      await items.update({_id : req.body.itemId},{likes : JSON.stringify(likes)},e=>e).then(l=>res.send(likes))
    }
    else{
      likes.push(req.body.liker)
      await items.update({_id : req.body.itemId},{likes : JSON.stringify(likes)},e=>e).then(l=>res.send(likes))
    }
  })
})


app.post('/adminka', async (req,res)=>{
  let isAdmin = false
  await users.find({_id: req.cookies.key}).then(r=>{
    isAdmin = (r[0].isAdmin===true)?true:false
  })
  if (isAdmin===false) {
    res.send('not admin')
    return false
  }
    //
    if (req.body.action == 'textfield'){
     await textfields.updateOne({type : 'adminfield'},{ano : req.body.ano.inner,gui : req.body.gui.inner,guimark : req.body.gui.mark,anomark : req.body.ano.mark},e=>e).then(l=>res.send(req.body)).catch(e=>res.send('error'))
    }
    if (req.body.action == 'block'){
      for (let i=0; i<req.body.users.length; i++){
        await users.find({_id: req.body.users[i]}).then(async q=>{
          let flag = !q[0].isBlocked
          await users.updateOne({_id : req.body.users[i]},{isBlocked : flag},e=>e).catch(e=>res.send('error'))
          if (i == req.body.users.length-1) res.send('ok')
        }).catch(e=>res.send('error'))
      }
      res.send('null')
    }
    if (req.body.action == 'admin'){
      for (let i=0; i<req.body.users.length; i++){
        await users.find({_id: req.body.users[i]}).then(async q=>{
          let flag = !q[0].isAdmin
          await users.updateOne({_id : req.body.users[i]},{isAdmin : flag},e=>e).catch(e=>res.send('error'))
          if (i == req.body.users.length-1) res.send('ok')
        }).catch(e=>res.send('error'))
      }
    }
    if (req.body.action == 'delete'){
      for (let i=0; i<req.body.users.length; i++){
        await users.find({_id: req.body.users[i]}).then(async q=>{
            let index = -1
            session.signed.forEach((v,i)=>{
              if (v.toString() === q[0]._id.toString()) index=i
            })
            if (index !== -1) session.signed.splice(index,1)
            await items.deleteMany({email : q[0].email},e=>e).catch(e=>res.send('error'))
            await collection.deleteMany({email : q[0].email},e=>e).catch(e=>res.send('error'))
            await users.deleteOne({email : q[0].email},e=>e).catch(e=>res.send('error'))
        }).catch(e=>res.send('error'))
      }
      res.send('null')
    }

})

app.post('/deletecollections', async (req,res)=>{
  const user = JSON.parse(req.body.user)
  const owne = JSON.parse(req.body.owner)
  const collectArr = JSON.parse(req.body.collections)
  let owner
  let access = false
  let error = false 
  if (error == true) return
  await users.find({_id : user._id}).then(async r=>{
      if(r.length!==0  && (r[0].isAdmin==true || r[0]._id == req.cookies.key)){
        access = true
        await users.find({_id : owne._id}).then(r=>{
          if (r.length!==0) {owner = r[0]}
          else { error=true;res.send({resp:'Owner not found'}) }
        }).catch(e=>{error=true;res.send({resp:'Database error'})})
      }
  }).catch(e=>{error=true;res.send({resp:'Database error'})})
  if (error == true) return
  console.log(`access=${access}`)
  if (access==true){
    for (let i=0;i<collectArr.length;i++){
    await collection.find({_id : collectArr[i]}).then(async r=>{
      if (r.length>0){
        console.log(`inside collection=${r[0]._id}`)
        console.log(`item email=${r[0].email}`)
        console.log(`owner email=${owner.email}`)
        let collect = r[0]
        if (collect.email===owner.email){
          await items.deleteMany({email : collect.email, collect : collect.name},e=>e).catch(e=>{error=true;res.send('Unable to delete collection items')})
          if (error == true) return
          await collection.deleteOne({_id : collect._id},e=>e).catch(e=>e)
        }
      }
    }).catch(e=>e)
    }
  }
  else{
    error=true;
    res.send({resp:'You have no access'})
  }
  if (error == true) return
  res.send({resp:'ok'})
})
app.post('/deleteitems', async (req,res)=>{
  const user = JSON.parse(req.body.user)
  const owne = JSON.parse(req.body.owner)
  const itemArr = JSON.parse(req.body.items)
  let owner
  let access = false
  await users.find({_id : user._id}).then(async r=>{
      if(r.length!==0  && (r[0].isAdmin==true || r[0]._id == req.cookies.key)){
        access = true
        await users.find({_id : owne._id}).then(r=>{
          if (r.length!==0) {owner = r[0]}
          else { res.send({resp:'Owner not found'}) }
        }).catch(e=>res.send({resp:'Database error'}))
      }
  }).catch(e=>res.send({resp:'Database error'}))
  console.log(`access=${access}`)
  if (access==true){
    for (let i=0;i<itemArr.length;i++){
    await items.find({_id : itemArr[i]}).then(async r=>{
      if (r.length>0){
        console.log(`inside item=${r[0]._id}`)
        console.log(`item email=${r[0].email}`)
        console.log(`owner email=${owner.email}`)
        let item = r[0]
        if (item.email===owner.email){
          await items.deleteOne({_id : item._id},e=>e).catch(e=>e)
        }
      }
    }).catch(e=>e)
    }
  }
  else{
    res.send({resp:'You have no access'})
  }
  res.send({resp:'ok'})
})
app.post('/sigvk', (req,res2)=>{
    request(req.body.url, function (err, res, data) {res2.send(data)});
})
app.post('/siggoo', (req,res2)=>{
    const uri = req.body.url
    const options = {
      url: uri, 
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    };
    request(options, function (error, res, boby) {
      if (error) {res2.send('nope')}
      else{
        request(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${JSON.parse(boby).access_token}`, function (err, res, data) {
          if (err) {res2.send('nope')}
          else{res2.send(data)}
        })
      }
    });
})
app.post('/addComment', async (req,res)=>{
    if (session.signed.some(v=>v==req.cookies.key)){
      let arr = JSON.parse(req.body.itemCom)
      arr.push(req.body)
      await items.update({_id : req.body.itemId},{comments : JSON.stringify(arr)},e=>e).then(r=>{
        res.send('ok')
      }).catch(e=>res.send('db error'))
    }
    else{
      res.send('login first')
    }
    
})
app.post('/deleteComment', async (req,res)=>{
    if (session.signed.some(v=>v==req.cookies.key)){
      let commentsField = JSON.stringify(req.body.delete.new)
      if (req.cookies.key != req.body.delete.comment.likerId) {
        res.send('not owner')
        return
      }
      await items.update({_id : req.body.delete.comment.itemId},{comments : commentsField},e=>e).then(r=>res.send('ok')).catch(e=>res.send('db error'))
    }
    else{
      res.send('login first')
    }
    
})

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
//SYNC
//SOCKET
//
global.__canOrCant = true
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){

  socket.on ('getAllData', ()=>{
    collection.find({}).then(r=>{
      users.find({}).then(r3=>{
        let ar = r3.map(v=>v)
        items.find({}).then(r2=>
          textfields.find({}).then(r5=>socket.emit('getAllData',{collections: r, items : r2, signed : session.signed, users : ar, textfields: r5})))
      })
    })
  })
    socket.on('get-collections',(r)=>{
        console.log(r)
        collection.find({email : r.email}).then(r=>{
            let arra = r.map(v=>v).reverse()
            socket.emit('get-collections',{respa : 'ok', data : arra})
        }).catch(()=>{
          socket.emit('get-collections',{respa : 'error : database error', data : []})
          return false
        })
    })
    socket.on ('sync', async r=>{
      if (session.signed.some(v=>v==r.cookies)) {
            let usr
            await users.find({_id : r.cookies }).then( p=>{
            usr = p[0]}).catch(e=>socket.emit('sync', {sess : session.signed , user : {}}))
            socket.emit('sync', {sess : session.signed , user : usr})
      }
      else{
          socket.emit('sync', {sess : session.signed, user : {}})

      }
    })

    socket.on('add-collection', async (r)=>{
        let forcer = {}
        await users.find({email : r.creator}).then(r=>{
          forcer = (r.length!==0)?r[0]:{}
        })
        if(r.creator !== r.email && forcer.isAdmin!=true) {
          socket.emit('add-collection',{respa : 'Yoy are not owner'})
          return false
        }
        if (['Alcohol','Cats','Weapon','Motos'].every(v=>v!=r.type)){
          socket.emit('add-collection',{respa : 'Type of collection not found'})
          return false
        }
        let exist = false
        await collection.find({name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''), email : r.email}).then(r=>{
          if (r.length > 0) exist = true;
        })
        if (exist==true){
          socket.emit('add-collection',{respa : 'Collection already exist'})
          return false
        }
        let img5 = ''
        if(r.img instanceof Buffer == true){
          await uploadToCloudinary(r.img).then(r=> img5=r.url).catch(e=>console.log('cant download'))
        }
        await collection.create({
            author : r.author,
            email : r.email,
            name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            descript : r.descript.replace(/\s+/g, ' '),
            comment : r.comment.replace(/\s+/g, ' '),
            type : r.type,
            img : img5,
            adds : r.adds
        }).catch(()=>{
          socket.emit('add-collection',{respa : 'Database error'})
          return false
        })
        socket.emit('add-collection',{respa : 'ok', data : r})

    });
    socket.on('edit-collection', async (r)=>{
        let erorrer = false
        if (erorrer == true) return false
        let forcer = {}
        await users.find({email : r.creator}).then(r=>{
          forcer = (r.length!==0)?r[0]:{}
        })
        if(r.creator !== r.email && forcer.isAdmin!=true) {
          socket.emit('edit-collection',{respa : 'Yoy are not owner'})
          return false
        }
        let current = {}
        await collection.find({name : r.defName, email : r.email}).then(r=>{
            if (r.length > 0) {current = r[0]}
            else {
              socket.emit('edit-collection',{respa : 'Collection not found'})
              erorrer=true
            }
        }).catch(e=>{
          socket.emit('edit-collection',{respa : 'Db error'})
          erorrer=true
        })
        if (erorrer == true) return false
        let img5 = ''
        if (r.img === current.img){
          img5 = r.img
        }
        else{
          if(r.img instanceof Buffer == true){
            await uploadToCloudinary(r.img).then(r=> img5=r.url).catch(e=>{
              console.log('cant download')
              img5 = r.img
            })
          }
          else{
            img5 = r.img
          }
        }
        if (r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'') !== current.name){
          await items.updateMany({collect : current.name, email: current.email}, {collect : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,'')}, e=>e).catch(e=>{
            socket.emit('edit-collection',{respa : 'Db error'})
            erorrer=true
          })
        }
        if (erorrer == true) return false
        let newads
        if (JSON.parse(r.primAdds) instanceof Array){
          if (JSON.parse(r.primAdds).every((e,i)=>Object.keys(e)[0] == Object.keys(JSON.parse(current.adds)[i])[0])){
            newads = JSON.stringify(JSON.parse(r.primAdds).concat(JSON.parse(r.adds)))
          }
          else{
            newads = JSON.stringify(JSON.parse(current.adds).concat(JSON.parse(r.adds)))
          }
        }
        else{
          newads = r.adds
        }
        await collection.updateOne({name : current.name, email: current.email},{
            name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            descript : r.descript.replace(/\s+/g, ' '),
            comment : r.comment.replace(/\s+/g, ' '),
            img : img5,
            adds : newads
        }, e=>e).catch(()=>{
          socket.emit('edit-collection',{respa : 'Database error'})
          erorrer=true
        })
        if (erorrer == true) return false
        socket.emit('edit-collection',{respa : 'ok', data : r})

    });
    socket.on('add-item', async (r)=>{
        let forcer = {}
        await users.find({email : r.creator}).then(r=>{
          forcer = (r.length!==0)?r[0]:{}
        })
        if(r.creator !== r.email && forcer.isAdmin!=true) {
          socket.emit('add-item',{respa : 'Yoy are not owner'})
          return false
        }
        if (['Alcohol','Cats','Weapon','Motos'].every(v=>v!=r.type)){
          socket.emit('add-item',{respa : 'error : type not found'})
          return false
        }
        let exist = false
        await items.find({name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''), email : r.email, collect : r.collect}).then(r=>{
          if (r.length > 0) exist = true;
        })
        if (exist==true){
          socket.emit('add-item',{respa : 'error : already exist'})
          return false
        }
        let exist2 = false
        await collection.find({name : r.collect, email : r.email}).then(r=>{
          if (r.length = 0) exist = true2;
        })
        if (exist2==true){
          socket.emit('add-item',{respa : 'error : collection not found'})
          return false
        }
        //
        let img5 = ''
        if(r.img instanceof Buffer == true){
          await uploadToCloudinary(r.img).then(r=> img5=r.url).catch(e=>console.log('cant download'))
        }
        await items.create({
            author : r.author,
            email : r.email,
            name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            description : r.description.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            type : r.type,
            collect: r.collect,
            img : img5,
            add : r.add,
            tags : r.tags,
            likes : '[]',
            comments :'[]'
        }).catch(()=>{
          socket.emit('add-item',{respa : 'error : database error'})
          return false
        })
        socket.emit('add-item',{respa : 'ok', data : r})
    });
    socket.on('edit-item', async (r)=>{
        let forcer = {}
        let error = false
        await users.find({email : r.creator}).then(r=>{
          forcer = (r.length!==0)?r[0]:{}
        })
        if(r.creator !== r.email && forcer.isAdmin!=true) {
          socket.emit('add-item',{respa : 'Yoy are not owner'})
          error = true
        }
        if (error==true) return
        // passed
        //find current item 
        let current = {}
        await items.find({name : r.defName, email : r.email, collect : r.collect}).then(r1=>{
            if (r1.length > 0) {current = r1[0]}
            else {
              socket.emit('edit-item',{respa : 'item not found',data : r})
              error=true
            }
        }).catch(e=>{
          socket.emit('edit-item',{respa : 'Db error'})
          error=true
        })
        if (error == true) return false

        //
        await items.find({name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''), email : r.email, collect : r.collect}).then(r=>{
          //something
        })
        //
        let img5 = ''
        if (r.img === current.img){
          img5 = r.img
        }
        else{
            if(r.img instanceof Buffer == true){
              await uploadToCloudinary(r.img).then(r=> img5=r.url).catch(e=>{
                console.log('cant download')
                img5 = r.img
              })
          }
          else{
            img5 = r.img
          }
        }
        await items.updateOne({name : r.defName, email : r.email, collect : r.collect},{
            name : r.name.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            description : r.description.replace(/\s+/g, ' ').replace(/(^\s*)|(\s*)$/g,''),
            img : img5,
            add : r.add,
            tags : r.tags
        },e=>e).catch(()=>{
          socket.emit('add-item',{respa : 'error : database error'})
          error=true
        })
        if (error == true) return false
        socket.emit('edit-item',{respa : 'ok', data : r})
    });
  });
//
module.exports = http