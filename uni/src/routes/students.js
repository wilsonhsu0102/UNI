var express = require('express');
const students = require('../lib/studentHandler')
var router = express.Router();
const Account = require('../models/account')
const Event = require('../models/event')
const { ObjectID } = require('mongodb')
const fs = require('fs');
const path = require('path');


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    console.log('authenticating!!!!!!!!!', req.session)
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

router.post('/addUser', function(req, res) {
    console.log('-qwrqwrqwr----')
    console.log(req.body)
    students.getAccountbyEmail2(req.body.email).then(response => {
        console.log(response)
        if (response.found === true) {
            console.log('This email is in use')
            res.send({msg: 'Email in Use'})
        } else if (response.found === false) {
            console.log('Did not find this email')
            req.body.profilePicture = (fs.readFileSync(path.resolve(__dirname, '../images/defaultprofilepic.png'))).toString('base64')
            students.addNewUser(req.body, res)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/all', function(req, res, next) {
    let studentList = []
    students.getAllStudents().then((result) => {
        studentList = result
        console.log(studentList)
        res.json(studentList)
    })
});

router.post('/login', (req, res) => {
	const email = req.body.email
    const password = req.body.password
    students.login(email, password, req, res)
})

// ADD MIDDLEWARE TO USE SESSION TO KNOW WHICH USER YOU ARE GETTING CONNECTIONS
router.get('/getConnections', authenticate, (req, res) => {
    const id = req.session.user
    
    if (id) {
        students.getConnections(id, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
    
})

router.get('/getDeck', authenticate, (req, res) => {
    const id = req.session.user
    console.log("THIS IS THE id!!!!!!!!!!", id)
    if (id) {
        console.log(id)
        students.getNotConnected(id, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
    
})

router.get('/getProfile', authenticate, (req, res) => {
    const email = req.session.email
    console.log(email)
    if (email) {
        students.getProfilebyEmail(email, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.get('/getAccount/:id', authenticate, (req, res) => {
    console.log(req.params.id)
    const id = req.params.id
    console.log("HI")
    console.log(id)
    if (id) {
        students.getAccountbyId(id, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})
router.get('/getAccount/', authenticate, (req, res) => {
    const email = req.session.email
    console.log(email)
    if (email) {
        students.getAccountbyEmail(email, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.post('/updateAccountInfo', authenticate, (req, res) => {
    const email = req.session.email
    console.log(email)
    if (email) {
        students.updateAccountInfo(email, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.post('/updateProfile', authenticate, (req, res) => {
    const email = req.session.email
    console.log(email)
    if (email) {
        // students.getProfilebyEmail(email, res)
        
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.post('/connect', authenticate, (req, res) => {
    const id = req.session.user
    const connectId = req.body.id
    if (id) {
        students.addConnection(id, connectId, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.get('/getSelfId', authenticate, (req, res) => {
    const id = req.session.user;
	const name = req.session.name;
    console.log("THIS IS THE id", id)
    if (id) {
        res.json({id, name});
        
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
    
})

router.get('/getAttendees', authenticate, (req, res) => {
    const eventId = req.query.eventId
    console.log(eventId)
    if (eventId) {
        students.getAttendees(eventId, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.get('/event', authenticate, (req, res) => {
    const eventId = req.query.eventId
    if (eventId) {
        Event.findById(eventId).then(doc => {
            if(!doc) {
                res.status(404).send()
            } else {
                const hostEmail = doc.host 
                students.getAccountbyEmail(hostEmail, res)
            }
        }).catch(err => {
            res.status(500).send()
        })
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

module.exports = router;