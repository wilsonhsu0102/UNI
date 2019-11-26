const mongoose = require('mongoose');

let profileSchema = new mongoose.Schema({
    profileName: String,
    description: String,
    email: String,
    // ... fill this schema with anything you need
});

module.exports = mongoose.model('Profile', profileSchema)