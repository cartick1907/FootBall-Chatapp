const io=require('socket.io')(8000);

const users={}
io.on('connection',socket=>{

    socket.on('new-user-joined',user=>{
        users[socket.id]=user;
        socket.broadcast.emit('user-joined',user);
    })

    socket.on('send' ,message=>{
        socket.broadcast.emit('recieve',{message:message , name:users[socket.id]});
    })
})