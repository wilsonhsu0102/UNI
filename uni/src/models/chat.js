const mongoose = require('mongoose');

const message = new mongoose.Schema({
	userID: String,
	message: String,
	timestamp: String
});

let chatSchema = new mongoose.Schema({
    combinedUserID: String,
    messageArray: [message],
	timestamp: String
});

module.exports = mongoose.model('Chat', chatSchema);