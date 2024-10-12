const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the vehicle image
        default: null,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const Rent = mongoose.model('Rent', rentSchema, 'cars'); // 'cars' is your collection name in the 'test' database

module.exports = Rent;

 // 'cars' is your collection name in the 'test' database
