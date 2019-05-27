const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    requestId: {
        type: mongoose.Schema.Types.ObjectId
    },
    messages: [
        {
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
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


RoomSchema.methods.toJSON = function () {
    const room = this;
    const roomObject = room.toObject();
    
    delete roomObject._id;

    return roomObject;
};

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;