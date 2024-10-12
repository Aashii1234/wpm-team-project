const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true }); // This will automatically add createdAt and updatedAt fields

const Review = mongoose.model('Review', reviewSchema ,'reviews');
module.exports = Review;
