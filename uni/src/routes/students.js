var express = require('express');
const students = require('../lib/studentHandler')
var router = express.Router();
module.exports = router;

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

router.get('/getConnections', (req, res) => {
    const id = req.query.id
    console.log(id)
    students.getConnections(id, req, res)
})