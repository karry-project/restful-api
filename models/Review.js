const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        trim: true
    }
}, {
    toObject: {
        versionKey: false,
        virtuals: true
    },
    toJSON: {
        versionKey: false,
        virtuals: true
    }
});


ReviewSchema.methods.toJSON = function () {
    const review = this;
    const reviewObject = review.toObject();

    return reviewObject;
};

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;