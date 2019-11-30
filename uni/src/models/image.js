const mongoose = require('mongoose');

let ImageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: Object,
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        // required: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);
