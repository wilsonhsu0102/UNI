var express = require('express');
const events = require('../lib/eventHandler')
var router = express.Router();
module.exports = router;

router.get('/all', function(req, res, next) {
    let eventList = []
    events.getAllEvents(function(response) {
        eventList = response
        console.log(eventList)
        res.json(eventList)
    })
});

router.get('/:eventId', function(req, res, next) {
    const eventId = req.params.eventId
    events.getEventById(eventId, function(response) {
        event = response
        console.log(event)
        res.json(event)
    })
});

router.get('/create', function(req, res, next) {
    const user = req.body.user
    events.getEventById(user, function(response) {
        event = response
        console.log(event)
        res.json(event)
    })
});