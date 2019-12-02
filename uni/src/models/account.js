const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let accountSchema = new mongoose.Schema({
    name: String,
	email: String,
	password: String,
    profilePicture: String,
    age: String,
    major: String,
	description: String,
	year: String,
	campus: String,
	connections: Array,
	pendingConnections: Array,
	invitations: Array,
	pendingInvitations: Array,
	admin: Boolean
});

accountSchema.pre('save', function(next) {
	const user = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
	if (user.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

accountSchema.statics.findByEmailPassword = function(email, pass) {
	const Account = this // binds this to the Account model
	
	// First find the user by their email
	return Account.findOne({ email: email }).then((user) => {
		if (!user) {
			console.log("REJECTED: findByEmailPassword")
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			console.log("user.password:", user.password, pass)
			bcrypt.compare(pass, user.password, (err, result) => {
				if (result) {
					console.log("RESOLVED: findByEmailPassword " + user)
					resolve(user)
				} else {
					console.log("ERROR: findByEmailPassword " + err)
					reject()
				}
			})
		})
	})
}
const Account = mongoose.model('Account', accountSchema)
module.exports = Account