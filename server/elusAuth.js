//common inner methods
const findUserCookSession = (cook, sessionSigned) =>{
    let id = -1; 
    let arr = sessionSigned.map(v=>v)
    for (let i=0; i < arr.length; i++){
        if (cook.toString() == arr[i].toString())
            id  = i;
    }
    return id;
}

const findUserCookPosts = (cook, Posts) =>{
    let id = -1; 
    let arr = Posts.map(v=>v)
    for (let i=0; i < arr.length; i++){
        if (cook.toString() == arr[i]._id.toString())
            id  = i;
    }
    return id;
}
const getBoolCookfromResp = (res, cook)=>{
    let vari;
    try{
        vari = JSON.parse(res._headers['set-cookie'].substr(res._headers['set-cookie'].indexOf(`${cook}=`)+9,5))
    }
    catch{
        vari = true
    }
    return vari
}

//funcionality, outer methods

/* 
    LOGOUT
    model = login model elem, 
    onlineFlag = name of bool in data base 'online' status

    OUT:

    res.cookie 'key' = ''
    
*/

const Logout = (req, res, model, onlineFlag = 'online',blocked = false)=>{
    let id = -1;
    for(let y = 0; y < session.signed.length; y++){
        if(session.signed[y] == req.cookies.key) id = y;
    }
    model.find({_id : session.signed[id]}).then(posts=>{
        if (posts.length){
            model.update({_id : session.signed[id]},{ [''+onlineFlag] : false},e=>e)
            session.signed.splice(id,1)
            res.cookie('key', '')
            if(blocked!=true){
                res.cookie('blocked', '')
            }
            else{
                res.cookie('blocked', 'true')
            }
            res.send({out: 'ok', action: 'logout'})
        }
        else{
            res.cookie('key', '')
            if(blocked!=true){
                res.cookie('blocked', '')
            }
            else{
                res.cookie('blocked', 'true')
            }
            res.send({out: 'neok', action : 'logout'})
        }
    })
}

/* 
    DELETE
    useriko = caller
    model = delete model elem, 
    model2 = model elem deletes automaticly
    user = user with emeil for delete model2
    redirected = redirect page

*/
function Delete(req, res, useriko ,model, model2, user, redirected='/'){
    if (useriko.isAdmin == false) return;
    model.find({}).then(posts=>{
        for(let v = 0; v < req.body.data.split(' ').length; v++){
            model.deleteOne({_id : ObjectId(req.body.data.split(' ')[v])}, e=>e).catch(e=>res.send({out: 'ok'}))
            model2.deleteMany({ user: user.email },e=>e).catch(e=>res.send({out: 'ok', action: 'delete'}))
      }
    }).then(p=>{
        res.send({out: 'ok', action : 'delete'})
    }).catch(e=>res.send({out: 'neok',action : 'delete'})) // Вытащить мои колекции + к дате)
}
//
/* 
    LOGIN

    IN:

    req is request from form with inputs[name = email & pass] 
    model = login model
    model.email must exist

    OUT:

    res.cookie.key = id              if valid
    res.cookie.invalid  = true       if invalid
    okRedir = page when u r loged in
    erRedir = page when u r put invalid 

*/
const onlineStr = 'online'
const Login = (req, res, model, okRedir='/', erRedir='/signin')=>{ 
    let find = -2
    let {email, pass} = req.body;
    model.find({email : email, pass : pass}).then(posts=>{
        if (posts.length){
            if (posts[0].isBlocked == true) {
                Logout(req, res, model, 'online')
                return false; 
            }
            if (session.signed.every((v)=>v.toString()!=posts[0]._id.toString())){ 
                session.signed.push(posts[0]._id)
            }
            if (req.cookies.key){
                find = findUserCookSession(req.cookies.key, session.signed)
                if (find > -1){ 
                    if (posts[0]._id.toString() != session.signed[find]){
                        session.signed.splice(find, 1);
                        model.update({_id : req.cookies.key}, { [''+onlineStr] : false },e=>e)
                    }
                }
            }
            model.update({_id : posts[0]._id}, { [''+onlineStr] : true },e=>e)
            res.cookie('key', posts[0]['_id'], { expires: new Date(Date.now() + 1200000), httpOnly: true })
            res.cookie('unsigned', '', { expires: new Date(Date.now() + 1200000), httpOnly: true })
            res.send({out: 'ok', signed : session.signed, user : posts[0]}) // Вытащить мои колекции + к дате
        }
        else{
            res.cookie('invalid','true')
            res.send('neok') //data
        }
    }).catch(e=>{
        res.send('neok')
    })
}
/* 
    VK

    IN:

    req is request from form with inputs[name = name & email & pass] 
    model = signup model, 
    obj = object of user properties for db
    onlineFlag = name of bool in data base 'online' status
    model.email must exist

    OUT:

    res.cookie.key = id              if valid
    res.cookie.invalid  = true       if invalid
    okRedir = page when u r loged in
    erRedir = page when u r put invalid 

*/
const VK = (req, res, model) =>{
    model.find({email: req.body.email}).then(p=>{
        if (p.length){
            Login(req, res, model)
        } else {
            SignUP(req ,res , model);
        }
    })

}
/* 
    SIGNUP

    IN:

    req is request from form with inputs[name = name & email & pass] 
    model = signup model, 
    obj = object of user properties for db
    onlineFlag = name of bool in data base 'online' status
    model.email must exist

    OUT:

    res.cookie.key = id              if valid
    res.cookie.invalid  = true       if invalid
    okRedir = page when u r loged in
    erRedir = page when u r put invalid 

*/
const SignUP = (req, res, model, onlineFlag = onlineStr, okRedir='/', erRedir='/signin')=>{
    let {email, pass, name} = req.body;
    const prototypeModule = {
        name: name,
        email: email,
        pass : pass,
        [''+onlineStr] : false,
        isAdmin: false,
        isBlocked : false
    }
    let exist = false;
    let id = ''; 
    let find = -2;
    let f1 = function (Moldel){
        return Moldel.create(prototypeModule).then(post=>{ 
            id = post._id
            if (session.signed.every((v)=>v.toString()!=post._id.toString())){
                session.signed.push(post._id)
            }
            if (find > -1){
                session.signed.splice(find, 1);
                Moldel.update({_id : req.cookies.key}, { [''+onlineFlag] : false },e=>e)
            }
            Moldel.update({_id : id}, { [''+onlineFlag] : true },e=>e)
        }).catch(e=>{
            res.cookie('invalid','true')
            res.send({out: 'neok', action : 'signup'}) // Вытащить мои колекции + к дате
        })
    }
    let f3 = function(Moldel){
        return Moldel.find({email: email}).then(posts=>{
            if (posts.length) exist = true;
        })
    }
    let f2 = async function (Moldel){
        if (req.cookies.key) {
            find = await findUserCookSession(req.cookies.key, session.signed)
        }
        await f3(Moldel)
        if (exist==true){
            res.cookie('invalid','true')
            res.send({out: 'neok', action: 'signup'}) // Вытащить мои колекции + к дате
        }
        else{
            await f1(Moldel) 
            res.cookie('key', id, { expires: new Date(Date.now() + 300000), httpOnly: true })
            let us
            await Moldel.find({}).then(p=>{
                us = p[p.length-1]
            })
            res.send({out: 'ok', action: 'signup' ,signed : session.signed, user : us}) // Вытащить мои колекции + к дате
        }
    }
    f2(model);
}
module.exports = {
Logout: Logout,
Delete: Delete,
getBoolCookfromResp : getBoolCookfromResp,
findUserCookPosts : findUserCookPosts,
findUserCookSession : findUserCookSession,
SignUP : SignUP,
Login : Login,
VK : VK
}