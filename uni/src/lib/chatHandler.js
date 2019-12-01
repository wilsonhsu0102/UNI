var mongoose = require('mongoose');
var constants = require('./constants');
const Chat = mongoose.model('Chat');

module.exports = {
    checkExists: function(idObject, res) {
        console.log('LOG: chatHandler->checkExists', 'idObject: ', idObject)
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
		
		const combined1 = idObject.id1 + idObject.id2;
		const combined2 = idObject.id2 + idObject.id1;
        Chat.findOne({$or: [{"combinedUserID": combined1}, {"combinedUserID": combined2}]}).then((messObj) => {
            if(messObj === null){
				console.log("Here");
				Chat.create({ combinedUserID: combined1, messageArray: [], timestamp: null}).then((newMessObj) => {
					console.log(typeof newMessObj);
					let messageObj = {
						messages: newMessObj.messageArray,
						timestamp: newMessObj.timestamp
					}
					console.log(typeof messageObj);
					res.json(messageObj);
				}).catch((error) => {
					console.log(error);
					console.log("wow2");
					console.warn('Something went wrong');
					res.json({});
				});
			} else {
				console.log('LOG: found messageObject', messObj);
                let messageObj = {
					messages: messObj.messageArray,
					timestamp: messObj.timestamp
				}
				res.json(messageObj);
			}
        }).catch((error) => {
			console.log("wow");
            console.warn('Something went wrong');
            res.json({});
        });
    }, 
    getMessages: function(idObject, res) {
        console.log('LOG: chatHandler->getMessages');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

		const combined1 = idObject.id1 + idObject.id2;
		const combined2 = idObject.id2 + idObject.id1;
        Chat.findOne({$or: [{"combinedUserID": combined1}, {"combinedUserID": combined2}]}).then((messObj) => {
			console.log('LOG: found messageObject', messObj);
            let messageObj = {
				messages: messObj.messageArray,
				timestamp: messObj.timestamp
			}
			res.json(messageObj);
        }).catch((error) => {
            console.warn('Something went wrong');
            res.json({});
        });
    },
}