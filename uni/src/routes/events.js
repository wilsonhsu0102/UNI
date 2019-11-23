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