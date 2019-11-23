var mongoose = require('mongoose');
var constants = require('./constants');
const Account = mongoose.model('Account');
const ObjectID = require('mongodb').ObjectID

console.log(Account)
module.exports = {
    login: function(email, password, req, res) {
        // Use the static method on the User model to find a user
        // by their email and password
        console.log('LOG: studentHandler->login ' + email + ' ' + password)
        Account.findByEmailPassword(email, password).then((user) => {
            if (!user) {
                res.json({success: false});
            } else {
                // We can check later if this exists to ensure we are logged in.
                res.json({success: true, id: user._id});
            }
        }).catch((error) => {
            console.log('ERROR: studentHandler->login ' + error);
            res.status(400).json(res.json({success: false}))
        })
        
    },
    getAllStudents: function() {
        console.log('LOG: studentHandler->getAllStudents');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        return new Promise((resolve, reject) => { 
            Account.find({}, function(err,res) {
                if (err) {
                    reject('ERROR: ' + err)
                }
                else if (res.length === 0) {
                    reject("No accounts found!")
                }
                else {
                    resolve({
                        students: res
                    })
                    //console.log(result)
                }
                
            })
        })
        
        
    },
    getStudentByID: function(id){
        console.log('LOG: studentHandler->getStudentByID');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        return new Promise((resolve, reject) => {
            Account.findById(id).then((accounts) => {
                resolve({
                    accounts: accounts
                })
                
            }).catch((error) => {
                console.warn('WARN: No accounts found!');
                reject("No accounts found!")
            })
        })
    },
    getConnections: function(id, req, res) {
        console.log('LOG: studentHandler->getConnections');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
        console.log(id)
        Account.findById({"_id": ObjectID(id)}).then((accounts) => {
            let result = []
            
            for (let i = 0; i < accounts.length; i++) {
                this.getStudentByID(id).then((student) => {
                    if (student) {
                        result.push(student)
                    }
                })
            }

            res.json({
                accounts: result
            })
            
        }).catch((error) => {
            console.warn('WARN: No accounts found!');
            res.json({})
        })
        
        
        
        /*.find({}, function(err,res) {
            if (err) {
                console.error('ERROR: ' + err);
            }
            else if (res.length === 0) {
                console.warn('WARN: No accounts found!');
            }
            else {
                result = res
                //console.log(result)
            }
            if (typeof callback === 'function') {
                console.log('calling back')
                callback(result);
            }
            
        })*/
    },
    getNotConnected: function(id) {

    },
    updateConnections: function(id) {

    }
}