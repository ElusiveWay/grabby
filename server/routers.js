var express = require('express');
var router = express.Router();
const users = require('./models/users')
const items = require('./models/items')
//Auth
const elusAuth = require('./elusAuth')
const { VK, Logout, Delete, getBoolCookfromResp,findUserCookSession , findUserCookPosts, SignUP, Login } = elusAuth

// Middleware routing
//       when user is blocked

router.use((req, res, next) => {
    switch (req.body.action){
        case 'logout':  Logout(req, res, users)
                        
                        break
        default:        break
    }
    if (req.body.action == 'logout') {
        Logout(req, res, users)
    }
    if (req.cookies.key){
        users.find({}).then(posts=>{
            let useriko = posts[findUserCookPosts(req.cookies.key, posts)]
            if (useriko.isBlocked == true) {
                Logout(req, res, users)
            }
            next()
        }).catch(e=>{
            next()
        })
    }
    else{
        next()
    }
  });

//Route main page

router.post('/',(req, res) => {
    
users.find({}).then(posts=>{
    let useriko = posts[findUserCookPosts(req.cookies.key, posts)]
    if(req.cookies.key){
        if(posts.some(v=> v._id==req.cookies.key)){
            switch (req.body.action){
                case '':
                    //something
                    break
                default : res.redirect('/')
                break
            }
        }
        else{
            res.redirect('/')
        }
    }
    else{
        res.redirect('/')
    }
}).catch(e=>res.redirect('/'))
})

//Route SIGNIN\UP page

//Post method used to add user to DB + start session like new user
router.post('/signin',(req, res) => { 
    console.log(req.body)
switch (req.body.action){
case 'signup':
    SignUP(req ,res , users);
    break
case 'signvk':
    VK(req ,res , users);
    break
case 'login': 
    Login(req, res, users)
    break
default: res.end
        break
}
})
router.post('/sync',async (req,res)=>{
    let b = (findUserCookSession(req.cookies.key,session.signed)==-1)?false:true,
        i = req.cookies.key
    if (!b) {
        Logout(req,res,users)
    }
    else{
        res.cookie('key', req.cookies.key)
        res.send({key : i})
    }
})



module.exports = router;
