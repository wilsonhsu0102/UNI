const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    eventName: String,
    location: String,
    date: String
});

module.exports = mongoose.model('Event', eventSchema)