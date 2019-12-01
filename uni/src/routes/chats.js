var express = require('express');
const chats = require('../lib/chatHandler');
var router = express.Router();
const Account = require('../models/account');
const { ObjectID } = require('mongodb');
const fs = require('fs');

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    console.log('authenticating', req.session)
	if (req.session.user) {
        console.log(req.session.user)
		Account.findById(new ObjectID(req.session.user)).then((user) => {
			if (!user) {
				return Promise.reject();
			} else {
				req.user = user;
				next();
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized", error);
		})
	} else {
		res.status(401).send("Unauthorized page");
	}
}

// ADD MIDDLEWARE TO USE SESSION TO KNOW WHICH USER YOU ARE GETTING CONNECTIONS

router.post('/checkExists', authenticate, (req, res) => {
    const id = req.session.user;
	const idObject = req.body;
	let messageObject = {
		messages: [],
		timestamp: null
	};
    if (id) {
		chats.checkExists(idObject).then((result) => {
			messageObject = result;
			console.log(messageObject);
			res.json(messageObject);
		})
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.get('/getMessages', authenticate, function(req, res, next) {
	const id = req.session.user;
	const idObject = req.body;
    let messageObject = {
		messages: [],
		timestamp: null
	};
	if (id) {  
		chats.getMessages(idObject).then((result) => {
			messageObject = result;
			console.log(messageObject);
			res.json(messageObject);
		})
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
});

module.exports = router;