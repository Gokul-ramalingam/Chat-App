const express = require('express');
const socket = require('socket.io');
const http = require('http');
const router = require('./router/route')

const port = process.env.PORT || 2000;

const app = express();
const server = http.createServer(app);
const io = socket(server);


io.on('connection', (socket) =>{
    console.log("New connection has been established!!!");

   socket.on('join',({ name , room },callback)=>{
      console.log(name , room);
   })

    socket.on('disconnect', () =>{
        console.log("Disconnection has been established!!!");
    })
})



app.use(router);

server.listen(port,()=>{
    console.log("Server is running on port "+port);
})