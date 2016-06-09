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

const app = express();

<<<<<<< HEAD
// socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);
=======
//socket io
let server = require('http').Server(app);
let io = require('socket.io')(server);
//app.io = io;
const connections = [];
>>>>>>> c232c265f7bdf07a96f5ec70f773b1aee5f904cc

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
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  socket.emit('connect');
  socket.on('updatePath', function(point){
    io.emit('updatePath', point);
  });
  socket.on('chat message', function(msg){
   console.log('msg', msg)
   io.emit('chat message', msg);
 });
});

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
