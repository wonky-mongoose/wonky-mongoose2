import { resolve } from 'path';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
const MongoStore = require('connect-mongo')(session);
import mongoose from './db';
import setupPassport from './setupPassport';
import homeRoute from './routes/home';
import apiRoute from './routes/api';

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

setupPassport();

let app = express();

//socket io
let server = require('http').Server(app);
let io = require('socket.io')(server);
const connections = [];

app
  .use(cors({
    origin: '*',
    methods: ['GET, POST, OPTIONS'],
    allowHeaders: 'content-type, accept',
    credentials: true,
    maxAge: 10,
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.static(resolve(__dirname, '../')))
  .use(session({
    secret: 'wonky',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(apiRoute)
  .use(homeRoute);
  
server.listen(port);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// io.on('connection', socket => {
//   console.log('connected to socket.io');
//   connections.push(socket);
//   socket.on('message', data => {
//     connections.forEach(connectedSocket => {
//       if (connectedSocket !== socket) {
//         connectedSocket.emit('message', data);
//       }
//     });
//   });

//   socket.on('disconnect', () => {
//     const index = connections.indexOf(socket);
//     connections.splice(index, 1);
//   });
// });

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
