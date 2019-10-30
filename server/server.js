const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const http = require('http');
const router = require('./router/route');
const { addUser,removeUser,getUser,getRoom } = require('./helper/users');

const port = process.env.PORT || 2000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(router);
app.use(cors());


io.on('connection', (socket) =>{
   socket.on('join',({ name , room },callback)=>{
      const {error, user} = addUser( { id:socket.id, name, room} );

      if(error) return callback(error);

       socket.emit("message", {user : "admin",text : `${ user.name },welcome to ${ user.room } chat room` })
       socket.broadcast.to(user.room).emit('message',{user: 'admin',text : `${ user.name } has joined`})

      socket.join(user.room);

      io.to(user.room).emit('roomData', { room: user.room, users: getRoom(user.room) });

      callback();
   })

   socket.on('sendMessage',(message,callback)=>{
     const user = getUser(socket.id);
     
     io.to(user.room).emit('message',{user: user.name, text:message});

     io.to(user.room).emit('roomData', { room: user.room, users: getRoom(user.room) });

     callback();
   })

    socket.on('disconnect', () =>{
       const user = removeUser(socket.id);

       if(user)
          io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`})
    })
})

server.listen(port,()=>{
    console.log("Server is running on port "+port);
})