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

const profilepic = [
  'TTMickey.jpg',
  'MinnieTT.jpg',
  'DonaldTT.jpg',
  'DaisyTT.jpg',
  'GoofyTT.jpg',
  'PlutoTT.jpg',
  'ChipTT.jpg',
  'DaleTT.jpg',
  'PoohTT.jpg',
  'PigletTT.jpg',
  'TiggerTT.jpg',
  'EeyoreTT.jpg',
  'TTChristopherRobin.jpg',
  'TTRoo.jpg',
  'StitchTT.jpg',
  'ScrumpTT.jpg',
  'MarieTT.jpg',
  'LadyTT.jpg',
  'PerryTT.jpg',
  'JackSTT.jpg',
  'ZeroTT.jpg',
  'WoodyTT.jpg',
  'BuzzTT.jpg',
  'TTJessie.jpg',
  'TTLotso.jpg',
  'MikeTT.jpg',
  'SulleyTT.jpg',
  'DumboTT.jpg',
  'TTAlice.jpg',
  'TTWhiteRabbit.jpg',
  'TTCheshireCat.jpg',
  'TTLittleOyster.jpg',
  'TinkerBellTT.jpg',
  'TTBambi.jpg',
  'TTThumper.jpg',
  'TTMissBunny.jpg',
  'TTElsa.jpg',
  'TTAnna.jpg',
  'TTOlaf.jpg',
  'TTSven.jpg',
  'TTMaleficent.jpg',
  'TTAriel.jpg',
  'TTFlounder.jpg',
  'TTSebastian.jpg',
  'TTRapunzel.jpg',
  'TTPascal.jpg',
  'TTBBPooh.jpg',
  'TTPete.jpg',
  'TTPumpkinMickey.jpg',
  'TTPumpkinMinnie.jpg',
  'TTHolidayMickey.jpg',
  'TTHolidayMinnie.jpg',
  'TTHolidayDonald.jpg',
  'TTHolidayDaisy.jpg',
  'TTHolidayGoofy.jpg',
  'TTValentinesMinnie.jpg',
  'TTValentinesDaisy.jpg',
  'TTBaymax.jpg',
  'TTSorcererMickey.jpg',
  'TTBelle.jpg',
  'TTBeast.jpg',
  'TTBunnyPooh.jpg',
  'TTBunnyTigger.jpg',
  'TTSurpriseElsa.jpg',
  'TTBirthdayAnna.jpg',
  'TTAngel.jpg',
  'TTHawaiianStitch.jpg',
  'TTLightningMcQueen.jpg',
  'TTMater.jpg',
  'TTRex.jpg',
  'TTRandall.jpg',
  'TTAladdin.jpg',
  'TTJasmine.jpg',
  'TTPinocchio.jpg',
  'TTJiminyCricket.jpg',
  'TTNickWilde.jpg',
  'TTJudyHopps.jpg',
  'TTFinnick.jpg',
  'TTMax.jpg',
  'TTClarice.jpg',
  'TTLuke.jpg',
  'TTR2D2.jpg',
  'TTYoda.jpg',
  'TTDarthVader.jpg',
  'TTRabbit.jpg',
  'TTOswald.jpg',
  'TTHolidayJack.jpg',
  'AlienTT.jpg',
  'TTC3PO.jpg'
]

let roomname;
let storageMSG = {};
let storagePoint = {};
let members = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('connect');
  socket.on('room', (room) => {
    //io.to(roomname).emit('profilepic', `http://www.tsumtsumcentral.com/assets/img/t128/${profilepic[picNum]}`);
    roomname = room;
    //console.log('roomname', roomname)
    socket.join(roomname);
    
    io.to(roomname).emit('chat history', storageMSG[roomname])
    io.to(roomname).emit('canvas history', storagePoint[roomname] || [])
  })
  socket.on('user', (user) => {
    const picNum = Math.floor(Math.random() * profilepic.length);
    const profileurl = `http://www.tsumtsumcentral.com/assets/img/t128/${profilepic[picNum]}`;
    console.log(typeof user);
    if(members[roomname]){
      members[roomname].push({user, profile: profileurl});
    } else {
      members[roomname] = [{user, profile: profileurl}];
    }
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