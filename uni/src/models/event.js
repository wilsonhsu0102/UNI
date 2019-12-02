const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    host: String, //Email of the host
    eventName: String,
    location: String,
    description: String,
    coverPhoto: String,
    date: String,
    attendees: Array //Emails of attendees
});

module.exports = mongoose.model('Event', eventSchema)