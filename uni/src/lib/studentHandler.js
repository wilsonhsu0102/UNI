var mongoose = require('mongoose');
var constants = require('./constants');
const Account = mongoose.model('Account');
const ObjectID = require('mongodb').ObjectID
const Profile = mongoose.model('Profile');

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
                req.session.user = user._id;
                console.log('success!!!!!!!!!!!!!!!')
                
                req.session.email = user.email
                req.session.save((err) => {
                    if (!err) {
                        console.log('user._id', req.session)
                        res.send({success: true});
                    }
                });
                
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
                    console.log(res)
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
        Account.findById({"_id": ObjectID(id)}).then((account) => {
            const connections = account.connections
            
            Account.find({ '_id' : {$in:connections}}).then((students) => {
                console.log('LOG: found students->', students)
                res.json(students)
            
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
    getNotConnected: function(id, req, res) {
        let allStudents =  []
        this.getAllStudents().then((result) => {
            allStudents = result.students
            
            let connected = []

            this.returnConnected(id).then((result) => {
                connected = result.res
                let notConnected = []
                console.log('connected!!!!!!!!', connected)
                for (let i = 0; i < allStudents.length; i++) {
                    if (!connected.includes(allStudents[i]._id)) {
                        console.log(allStudents[i]._id)
                        notConnected.push(allStudents[i])
                    }
                }
                res.json({notConnected: notConnected})

            }).catch((error) => {
                console.log(error)  // handle any rejects that come up in the chain.
                res.send("An error has occurred")
            })

            

        }).catch((error) => {
            console.log(error)  // handle any rejects that come up in the chain.
            res.send("An error has occurred")
        })
        
        
    },
    addConnection: function(adderId, connectionId, req, res) {
        console.log('LOG: studentHandler->addConnection')
        let connected = []
        this.returnConnected(adderId).then((result) => {
            connected = result.res
            connected.push(connectionId)

            let connected2 = []
            this.returnConnected(connectionId).then((result) => {
                connected2 = result.res
                connected2.push(adderId)
                //res.json({success: true})

                mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

                var db = mongoose.connection;
                db.on( 'error', console.error.bind( console, 'connection error:' ) );

                db.once( 'open', () => console.log('connected to the database'));

                const query = { _id: connectionId}
                const update = { $set: {connections: connected2 }}
                Account.updateOne( query, update ).then((accounts) => {
                    console.log("1 document updated");
                }).catch((error) => {
                    console.warn('WARN: No accounts found!');
                    res.json({ success: false})
                })

                const query2 = { _id: adderId}
                const update2 = { $set: {connections: connected }}
                Account.updateOne( query2, update2 ).then((accounts) => {
                    console.log("1 document updated");
                }).catch((error) => {
                    console.warn('WARN: No accounts found!');
                    res.json({ success: false})
                })


            }).then((result) => { 
                res.json({ success: true})
            }).catch((error) => {
                console.log(error)  // handle any rejects that come up in the chain.
                res.send("An error has occurred")
            })

        }).catch((error) => {
            console.log(error)  // handle any rejects that come up in the chain.
            res.send("An error has occurred")
        })

        

    },
    getProfilebyEmail: function(email) {
        console.log('LOG: studentHandler->getProfilebyEmail');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(email)
        return new Promise((resolve, reject) => {
            Profile.findOne({"email": email}).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.warn('WARN: This email is not correct!')
                reject()
            })
        })

    },
    returnConnected: function(id) {
        console.log('LOG: studentHandler->returnConnected');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
        console.log(id)
        return new Promise((resolve, reject) => { 
            Account.findById({"_id": ObjectID(id)}).then((account) => {
                const result = account.connections
                console.log(result)

                resolve({res: result})
                
            }).catch((error) => {
                console.warn('WARN: No accounts found!');
                reject()
            })
        })
    },
    
}