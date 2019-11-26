const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    host: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    name: String,
    location: String,
    date: Date, 
    attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}]
});

module.exports = mongoose.model('Event', eventSchema)