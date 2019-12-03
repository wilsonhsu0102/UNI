var mongoose = require('mongoose');
var constants = require('./constants');
const Account = mongoose.model('Account');
const ObjectID = require('mongodb').ObjectID
const Profile = mongoose.model('Profile');
const Event = mongoose.model('Event');

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
				
				req.session.name = user.name;
                req.session.email = user.email
                req.session.save((err) => {
                    if (!err) {
                        console.log('user._id', req.session)
                        res.send({success: true, admin: user.admin});
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
                    if (!connected.includes(allStudents[i]._id) && allStudents[i]._id != id) {
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
        console.log('LOG: studentHandler->addConnection', 'adderId: ', adderId, connectionId)
        let connected = []
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        Account.findOne({"_id": adderId}).then((acc) => {
            let pendConnections = acc.pendingConnections
            let connect = acc.connections
            
            Account.findOne({"_id": connectionId}).then((account) => {
                let pendingConnections = account.pendingConnections
                let connections = account.connections

                console.log('here', connectionId)
                if (pendingConnections.includes(adderId)) {
                    // connection established
                    let index = pendingConnections.indexOf(adderId);
                    let index2 = pendConnections.indexOf(connectionId)
                    pendingConnections.splice(index, index+1)
                    pendConnections.splice(index2, index2+1)
                    connections.push(adderId)
                    connect.push(connectionId)
                    console.log(connections)
                } else {
                    pendConnections.push(connectionId)
                }
                console.log(connections)
                const query = { _id: connectionId}
                const update = { $set: {connections: connections, pendingConnections: pendingConnections}}
                Account.updateOne( query, update ).then((accounts) => {
                    console.log("1 document updated");

                    const query2 = { _id: adderId}
                    const update2 = { $set: {connections: connect, pendingConnections: pendConnections }}
                    Account.updateOne( query2, update2 ).then((accounts) => {
                        console.log("1 document updated");
                    }).catch((error) => {
                        console.warn('WARN: No accounts found!');
                        res.json({ success: false})
                    })
                }).catch((error) => {
                    console.warn('WARN: No accounts found!');
                    res.json({ success: false})
                })

                

                
            }).catch((error) => {
                console.warn(error);
                res.json({ success: false })
            })
        }).then((result) => {
            res.json({success: true})

        }).catch((error) => {
            console.warn('WARN: No accounts found! 3 ');
            res.json({ success: false })
        })
                


    },
    getAttendees: function(id, req, res) {
        console.log('LOG: studentHandler->getAttendees');
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
        Event.findById({"_id": id}).then((event) => {
            console.log(event)
            const attendees = event.attendees
            
            Account.find({ 'email' : {$in:attendees}}).then((students) => {
                console.log('LOG: found students->', students)
                res.send(students)
            })
        }).catch((error) => {
            console.warn('WARN: No accounts found!');
            res.json({})
        })
    },
    getProfilebyEmail: function(email, res) {
        console.log('LOG: studentHandler->getProfilebyEmail');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(email)
        Profile.findOne({"email": email}).then((result) => {
            console.log("I found the profile")
            res.send(result)
        }).catch((error) => {
            console.warn('WARN: This email is not correct!')
            res.send({success:false})
        })

    },
    getAccountbyEmail: function(email, res) {
        console.log('LOG: studentHandler->getAccountbyEmail1');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(email)
        Account.findOne({"email": email}).then((result) => {
            console.log("I found the account")
            res.send(result)
        }).catch((error) => {
            console.warn('WARN: This email is not correct!')
            res.send({success:false})
        })

    },
    getAccountbyEmail2: function(email) {
        console.log('LOG: studentHandler->getAccountbyEmail2');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(email)
        return new Promise((resolve, reject) => {
            Account.findOne({"email": email}).then((result) => {
                console.log("I found the account")
                if(!result) {
                    resolve({found: false})
                } else {
                    resolve({found: true})
                }
            }).catch((error) => {
                reject({found:false})
            })
        })
    },
    addNewUser: function(user, res) {
        console.log('LOG: studentHandler->addNewUser');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(user)
        const new_user = new Account(user)
        new_user.save().then( data => {
            console.log('AFTER SAVEEE')
            console.log(data)
            res.send({user: data, msg: 'Email is OK'})
        }).catch( err => {
            res.status(400).send(err)
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
    updateProfile: function(email, req, res) {
        console.log('LOG: studentHandler->updateProfile');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection;
        db.on( 'error', console.error(bind(console, 'connection error:')));
        db.once('open', () => console.log('connected to the database'));
        const filter = { "email": email };
        const update = req;
        let doc = Profile.findOneAndUpdate(filter, update, {new: true});
        console.log(doc);
    },
    updateAccountInfo: function(email, req, res) {
        console.log('LOG: studentHandler->updateAccountInfo');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection;
        db.on( 'error', console.error.bind(console, 'connection error:'));
        db.once('open', () => console.log('connected to the database'));
        const filter = { "email": email };
        const intro = req.body.intro;
        const major = req.body.major;
        const year = req.body.year;
        const campus = req.body.campus;
        Account.findOneAndUpdate(filter, {description: intro, major: major, year: year, campus: campus}, {new: true})
            .then(result => {
                console.log(result);
                res.send(result);
            }).catch((error) => {
                console.warn('WARN: No account related to this email.')
                res.send({success: false})
            })
    },
    getAccountbyId: function(id, res) {
        console.log('LOG: studentHandler->getAccountbyEmail1');
        mongoose.connect(constants.MONGO_DB_URL, {useNewUrlParser: true})

        var db = mongoose.connection
        db.on( 'error', console.error.bind(console, 'connection error:'))

        db.once('open', () => console.log('connected to the database'))
        console.log(id)
        Account.findById(id).then((result) => {
            console.log("I found the account")
            res.send(result)
        }).catch((error) => {
            console.warn('WARN: This email is not correct!')
            res.send({success:false})
        })

    },
    
}