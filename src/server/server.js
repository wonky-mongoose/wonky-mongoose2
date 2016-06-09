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

// socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);

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
  });
});

process
  .stdout
  .write(`Server listening on http://${host}:${port}. Use <ctrl-c> to stop server.\n`);
