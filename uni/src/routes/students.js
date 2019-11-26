var express = require('express');
const students = require('../lib/studentHandler')
var router = express.Router();
const Account = require('../models/account')
module.exports = router;

const session = require('express-session')

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		Account.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.status(401).send("Unauthorized")
	}
}

/*** Session handling **************************************/
// Create a session cookie
router.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

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
    const id = req.user._id
    console.log(id)
    if (id) {
        students.getConnections(id, req, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
    
})

router.get('/getProfile', authenticate, (req, res) => {
    const id = req.user._id
    console.log(id)
    if (id) {
        // student.getUserbyId(id)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})