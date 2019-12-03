const mongoose = require('mongoose');

let ImageSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: Object,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Image', ImageSchema);
