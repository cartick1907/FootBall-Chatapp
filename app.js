const express = require('express')
const app = express()
const port = 4000;
const path = require('path')
const server = require('http').createServer(app);
const io = require("socket.io")(server);



app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
// console.log(__dirname + '/public');
app.set('view engine', 'hbs');

app.use('/', (req,res)=>{
  res.render('index');
})

server.listen(port,(req,res)=>{
  console.log(`app running on port ${port}`)
})


const users={}
io.on('connection',socket=>{

    socket.on('new-user-joined',user =>{
        users[socket.id]=user;
        console.log(`new user : ${user}`)
        socket.broadcast.emit('user-joined',user);
    })

    socket.on('send' ,message =>{
        socket.broadcast.emit('recieve',{message:message , name:users[socket.id]});
    })
    socket.on('disconnect' ,message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})
