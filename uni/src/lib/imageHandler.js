var mongoose = require('mongoose');
var constants = require('./constants');
const Image = mongoose.model('Image');
const fs = require('fs');
console.log(Image)
module.exports = {
    getImagesByEmail: function(email, res) {
        console.log('LOG: images->getImageByEmail');
        var result = [];
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        Image.find({ email: email}).then(result => {
            console.log(result);
            res.send(result);
        }).catch((error) => {
            console.warn('WARN: No images related to this email.')
            res.send({success: false})
        })
        
    },
    getImagesById: function(id, res) {
        console.log('LOG: images->getImageById');
        var result = [];
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));

        Image.find({id: id}).then(result => {
            console.log(result);
            res.send(result);
        }).catch((error) => {
            console.warn('WARN: No images related to this email.')
            res.send({success: false})
        })
        
    },
    uploadPhoto: function(image, res, req) {
        console.log('LOG: images->uploadPhoto');
        var result = [];
        mongoose.connect(constants.MONGO_DB_URL, { useNewUrlParser: true })

        var db = mongoose.connection;
        db.on( 'error', console.error.bind( console, 'connection error:' ) );

        db.once( 'open', () => console.log('connected to the database'));
        image.append("image", fs.readFileSync(image.imageData.path));
        Image.collection.insertOne(image, function(err, r) {
            console.log('LOG: Image collection has been created!');
            db.close();
        })
    }
}