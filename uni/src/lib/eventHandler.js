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

        Event.find({}, function(err,res) {
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
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        Event.find({ _id: id}, function(err,res) {
            if (err) {
                console.error('ERROR: ' + err);
            }
            else if (res.length === 0) {
                console.warn('WARN: No events found!');
            }
            else {
                result = res[0]
                //console.log(result)
            }
            if (typeof callback === 'function') {
                console.log('calling back')
                callback(result);
            }
        })
    }
}