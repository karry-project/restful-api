const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
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
    const request = this
    const requestObject = request.toObject()

    return requestObject;
};

const Request = mongoose.model('Request', RequestSchema);
module.exports = { Request };