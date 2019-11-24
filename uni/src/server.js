const bodyParser = require('body-parser');
const express = require('express');

const mongoose = require('mongoose');
const constants = require('./lib/constants');
require('./models/event')
require('./models/account')
console.log('required')
var eventListRouter = require('./routes/events');
var studentListRouter = require('./routes/students');
const cors = require('cors')
const session = require('express-session')


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || constants.MONGO_DB_URL);

const app = express();

app.use(bodyParser.json())
app.use(cors())
app.options('*', cors());
app.use('/eventList', eventListRouter);
app.use('/student', studentListRouter);
app.use(session({
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 60000,
      httpOnly: true
  }
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});


let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
