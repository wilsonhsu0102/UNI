var express = require('express');
const events = require('../lib/eventHandler')
const Event = require('../models/event')
const { ObjectID } = require('mongodb')
var router = express.Router();

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    console.log('authenticating', req.session)
	if (req.session.user) {
        console.log(req.session.user)
		Account.findById(new ObjectID(req.session.user)).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized", error)
		})
	} else {
		res.status(401).send("Unauthorized page")
	}
}

router.get('/event', function(req, res, next) {
    console.log('------------------')
    console.log(req.query.id)
    events.getEventById(req.query.id, function(response) {
        event = response
        console.log('GOT EVENTTTT')
        console.log(event)
        res.json(event)
    })
})

router.get('/all', function(req, res, next) {
    let eventList = []
    events.getAllEvents(function(response) {
        eventList = response
        console.log('I CAN GET SHT')
        console.log(eventList)
        res.json(eventList)
    })
});

router.post('/addEvent', function(req, res, next) {
    console.log('-------------_______-_________')
    console.log(req.body.host)
    console.log('________________----------')

    const datetime = new Date(req.body.datetime)
    console.log(datetime)
    const event = new Event({
        eventName: req.body.name,
        description: req.body.description,
        location: req.body.location,
        attendees: req.body.attendees,
        host: req.body.host,
        date: datetime
    })
	// Save the user
	event.save().then((event) => {
        console.log(event)
		res.send(JSON.stringify(event))
	}, (error) => {
        console.log('qweqwe')
		res.status(400).send(error) // 400 for bad request
	})
});

router.post('/addNewAttendee',  function(req, res) {
    if (req.body.user_email && req.body.eventId) {
        Event.findOneAndUpdate({ _id: req.body.eventId }, { $push: { attendees: req.body.user_email }}).then( doc => {
            console.log(doc)
            res.send(doc)
        }).catch( err => {
            res.status(500).send()
        })
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

module.exports = router;
