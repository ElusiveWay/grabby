const http = require('./app')
const database = require('./database')
const config = require('./config')

database().then(info => {
                console.log(`success to : ${info.host}:${info.port}/${info.name}`)
                let portik = process.env.PORT || 3001
                http.listen(portik, function(){
                    console.log('listening on *:3001');
                  });
            }).catch(()=>{
                console.log('Connection to DB failed!')
                process.exit(1);
            })
