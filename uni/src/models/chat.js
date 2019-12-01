const mongoose = require('mongoose');

const message = new mongoose.Schema({
	userID: String,
	message: String,
	timestamp: Date
});

let chatSchema = new mongoose.Schema({
    combinedUserID: String,
    messageArray: [message],
	timestamp: Date
});

module.exports = mongoose.model('Chat', chatSchema);