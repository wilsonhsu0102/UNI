var express = require('express');
const events = require('../lib/eventHandler')
const Event = require('../models/event')
const { ObjectID } = require('mongodb')
var router = express.Router();

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
        attendees: [],
        host: req.body.host,
        date: datetime
    })
	// Save the user
	event.save().then((event) => {
        console.log(event)
        res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(event))
	}, (error) => {
        console.log('qweqwe')
		res.status(400).send(error) // 400 for bad request
	})
});

module.exports = router;
