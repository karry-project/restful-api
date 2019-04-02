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
});

const Request = mongoose.model('Request', RequestSchema);
module.exports = { Request };