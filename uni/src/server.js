const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');
const constants = require('./lib/constants');
require('./models/event')
const Account = require('./models/account')
const Profile = require('./models/profile')
console.log('required')
var eventListRouter = require('./routes/events');
var studentListRouter = require('./routes/students');
var imagesRouter = require('./routes/images');
const cors = require('cors')
const session = require('express-session')



mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || constants.MONGO_DB_URL);

const app = express();

app.use(bodyParser.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
//app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 6000000,
      httpOnly: true
  }
}));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});

module.exports = app;

app.use('/eventList', eventListRouter);
app.use('/student', studentListRouter);
app.use('/images', imagesRouter);

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

