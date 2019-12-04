var mongoose = require('mongoose');
var constants = require('./constants');
const Chat = mongoose.model('Chat');
const datetime = require('date-and-time');

const timeSort = (mess1,mess2) => {
	const time1 = datetime.parse(mess1.timestamp, 'YYYY/MM/DD HH:mm:ss');
	const time2 = datetime.parse(mess2.timestamp, 'YYYY/MM/DD HH:mm:ss');
	return datetime.subtract(time1, time2).toSeconds();
}

module.exports = {
    checkExists: function(idObject, res) {
        console.log('LOG: chatHandler->checkExists', 'idObject: ', idObject)
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
		
		const combined1 = idObject.id1 + idObject.id2;
		const combined2 = idObject.id2 + idObject.id1;
        Chat.findOne({$or: [{"combinedUserID": combined1}, {"combinedUserID": combined2}]}).then((chatObj) => {
            if(chatObj === null){
				Chat.create({ combinedUserID: combined1, messageArray: [], timestamp: null}).then((newChatObj) => {
					let messageObj = {
						messages: newChatObj.messageArray,
						timestamp: newChatObj.timestamp,
						combinedId: combined1
					}
					res.json(messageObj);
				}).catch((error) => {
					console.warn('Something went wrong');
					res.json({});
				});
			} else {
				console.log('LOG: found messageObject', chatObj);
                let messageObj = {
					messages: chatObj.messageArray,
					timestamp: chatObj.timestamp,
					combinedId: chatObj.combinedUserID
				}
				res.json(messageObj);
			}
        }).catch((error) => {
            console.warn('Something went wrong');
            res.json({});
        });
    },
	getMessages: function(combinedId, res) {
        console.log('LOG: chatHandler->getMessages');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
		
        Chat.findOne({"combinedUserID": combinedId}).then((chatObj) => {
			console.log('LOG: found chatObj', chatObj);
            let messageObj = {
				messages: chatObj.messageArray,
				timestamp: chatObj.timestamp
			}
			res.json(messageObj);
        }).catch((error) => {
            console.warn('Something went wrong');
            res.json({});
        });
    },
	sendMessage: function(messObj, res) {
        console.log('LOG: chatHandler->sendMessage');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
		
		const newMessage = {
			userID: messObj.userId,
			message: messObj.message,
			timestamp: messObj.timestamp
		}
        Chat.findOne({"combinedUserID": messObj.combinedId}).then((chatObj) => {
			let newMessageArray = chatObj.messageArray;
			newMessageArray.push(newMessage);
			const sortedMessArray = newMessageArray.sort(timeSort);
			const newTimestamp = sortedMessArray[sortedMessArray.length - 1].timestamp;
			Chat.findOneAndUpdate({"combinedUserID": messObj.combinedId}, {$set: {messageArray: sortedMessArray, timestamp: newTimestamp}}, {new: true}).then((updatedChatObj) => {
				let messageObj = {
					messages: updatedChatObj.messageArray,
					timestamp: updatedChatObj.timestamp
				}
				res.json(messageObj);
			}).catch((error) => {
				console.warn('Something went wrong');
				res.json({});
			});
        }).catch((error) => {
            console.warn('Something went wrong');
            res.json({});
        });
    },
}