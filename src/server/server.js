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
//app.io = io;

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
  .use(express.static(resolve(__dirname, '../../src/client/assets')))
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

let roomname;
let storageMSG = {};
let storagePoint = {};
let members = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connect');
  socket.on('room', (room) => {
    roomname = room;
    //console.log('roomname', roomname)
    socket.join(roomname);
    io.to(roomname).emit('chat history', storageMSG[roomname])
    io.to(roomname).emit('canvas history', storagePoint[roomname])
  })
  socket.on('user', (user) => {
    members[roomname] ? members[roomname].push(user) : members[roomname] = [user];
    socket.emit('user', members[roomname])
  })
  socket.on('updatePath', (point) => {
    io.to(roomname).emit('updatePath', point);
    storagePoint[point.classroom] ? storagePoint[point.classroom].push(point) : storagePoint[point.classroom] = [point];
    console.log('point', storagePoint)  
  });
  socket.on('chat message', (msg) => {
    //console.log('chat msg', msg)
    storageMSG[msg.classroom] ? storageMSG[msg.classroom].push(msg) : storageMSG[msg.classroom] = [msg];
   // console.log('storageMSG', storageMSG);
    io.to(roomname).emit('chat message', msg);
  });
});

// io.on('updatePath', function(point){
//   console.log('updating path');
//   io.emit('updatePath', point);
// });

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);