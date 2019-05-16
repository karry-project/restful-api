const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    reward: {
        type: String,
        required: true
    },
    estimatePrice: {
        type: String,
        required: true
    },
    estimateVolume: {
        type: String,
        required: true
    },
    estimateWeight: {
        type: String,
        required: true
    },
    message: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['waiting', 'accepted', 'denied'],
        default: 'waiting',

    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
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


RequestSchema.methods.toJSON = function () {
    const request = this;
    const requestObject = request.toObject();

    return requestObject;
};

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;
