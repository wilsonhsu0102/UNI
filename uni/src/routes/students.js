var express = require('express');
const students = require('../lib/studentHandler')
var router = express.Router();
const Account = require('../models/account')
const { ObjectID } = require('mongodb')


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    console.log('authenticating', req.session)
	if (req.session.user) {
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
    console.log(id)
    if (id) {
        students.getConnections(id, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
    
})

router.get('/getDeck', authenticate, (req, res) => {
    const id = req.session.user
    console.log("THIS IS THE id", id)
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
        students.getProfilebyEmail(email)
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

module.exports = router;