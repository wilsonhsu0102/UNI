var mongoose = require('mongoose');
var constants = require('./constants');
const Event = mongoose.model('Event');
console.log(Event)
module.exports = {
    getAllEvents: function(callback) {
        console.log('LOG: events->getAllEvents');
        var result = [];
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
        currentTime = new Date().now()
        Event.find({ date: { $gte: currentTime }}, function(err,res) {
            if (err) {
                console.error('ERROR: ' + err);
            }
            else if (res.length === 0) {
                console.warn('WARN: No events found!');
            }
            else {
                result = res
                //console.log(result)
            }
            if (typeof callback === 'function') {
                console.log('calling back')
                callback(result);
            }
            
        })
    },
    getEventById: function(id, callback) {
        // id here is _id for event schema
        console.log('LOG: events->getEventById');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        Event.findById(id, function(err,res) {
            if (err) {
                console.error('ERROR: ' + err);
            }
            else if (res.length === 0) {
                console.warn('WARN: No events found!');
            }
            else {
                result = res
                console.log(result)
            }
            if (typeof callback === 'function') {
                console.log('calling back')
                callback(result);
            }
            
        })
    },
    createNewEvent: function(user, callback) {
        // user taking in is a profile schema object
        console.log('LOG: events->createNewEVent')
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        const newEvent = new Event({host: user, name: "Event Name", location: "BA3145", date: new Date().now(), attendees: []})
        newEvent.save().then(item => {
            res.send(`${item} saved to database`)
        }).catch(err => {
            res.status(500).send("Unable to save to database")
        })

    }
}