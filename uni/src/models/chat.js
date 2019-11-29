const mongoose = require('mongoose');

const message = new mongoose.Schema({
	userID: String
	message: String
	timestamp: Date
});

let chatSchema = new mongoose.Schema({
    combinedUserID: String,
    messageArray: [message]
});

module.exports = mongoose.model('Chats', chatSchema)