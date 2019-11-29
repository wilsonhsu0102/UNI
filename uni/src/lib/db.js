var MongoClient = require('mongodb').MongoClient;
var constants = require('./constants');
var mongoose = require('mongoose');
var Event = require('../models/event')
const Account = require('../models/account')
const Profile = require('../models/profile')
console.log('MONGO_DB_URL', constants.MONGO_DB_URL)
var fs = require('fs');
var accountList = JSON.parse(fs.readFileSync("src/data/init.json"));
var eventList = JSON.parse(fs.readFileSync("src/data/events.json"));
const profileList = JSON.parse(fs.readFileSync("src/data/profiles.json"));
module.exports = {
    init: function() {
        console.log('LOG: db->init');
        console.log('LOG: Initializing DB...');
        mongoose.connect(constants.MONGO_DB_URL) 
        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        // once the connection is established we define our schemas
        db.once( 'open', function callback() {
            console.log("connected")
            Event.collection.insertMany(eventList, function(err,r) {
                if (err) {
                    console.log(err)
                    db.close();
                } else {
                    console.log(r)
                    console.log('LOG: Event collection has been created!');
                    db.close();
                }
            })
        });

        for (let i = 0; i < accountList.length; i++) {
            const account = new Account(accountList[i])
            account.save().then((user) => {
                console.log('LOG: init->added account', account)
            }, (error) => {
                console.log('ERROR: init->error in init', error)
            })
        }

        // once the connection is established we define our schemas
        
        db.once( 'open', function callback() {
            console.log("connected")
            Profile.collection.insertMany(profileList, function(err,r) {
                console.log('LOG: Profile collection has been created!');
                db.close();
            })
        });
    }
}
require('make-runnable');