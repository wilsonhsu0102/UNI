const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const constants = require('./uni/src/lib/constants');
require('./uni/src/models/event')
const Account = require('./uni/src/models/account')
const Profile = require('./uni/src/models/profile')
const Chat = require('./uni/src/models/chat')
console.log('required')
var eventListRouter = require('./uni/src/routes/events');
var studentListRouter = require('./uni/src/routes/students');
var imagesRouter = require('./uni/src/routes/images');
var chatsRouter = require('./uni/src/routes/chats');
const cors = require('cors')
const session = require('express-session')
const fs = require('fs')


 
mongoose.Promise = global.Promise;
console.log('process.env.MONGODB_URI', process.env.MONGODB_URI)
console.log('constants.MONGO_DB_URL', constants.MONGO_DB_URL)
mongoose.connect(process.env.MONGODB_URI || constants.MONGO_DB_URL);

const app = express();

app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(cors({credentials: true, origin: 'http://uni-uoft.herokuapp.com'}));
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//app.options('*', cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 6000000000000,
      httpOnly: true
  }
}));

app.use(express.static(path.join(__dirname, 'uni', 'build')));

/*
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'uni', 'build', 'index.html'));
});
*/


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

module.exports = app;

app.use('/events', eventListRouter);
app.use('/student', studentListRouter);
app.use('/images', imagesRouter);
app.use('/chats', chatsRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'uni', 'build', 'index.html'));
});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

