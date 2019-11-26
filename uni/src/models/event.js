const mongoose = require('mongoose');

let eventSchema = new mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    eventName: String,
    location: String,
    description: String,
    date: Date,
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account'}]
});

module.exports = mongoose.model('Event', eventSchema)