var mongoose = require('mongoose');
var constants = require('./constants');
const Image = mongoose.model('Image');
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
}