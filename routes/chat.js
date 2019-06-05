const Room = require('./../models/Room');

module.exports = io => {
    let room = null;

    io.on('connection', (socket) => {
        socket.on('join', (roomId) => {
            room = roomId
            socket.join(room);
            socket.broadcast.to(room).emit('userjoinedthechat', `Someone : has joined the chat `);
        });

        socket.on('sendmessage', (senderNickname, messageContent) => {
            const message = { "message": messageContent, "date": Date.now(), from: senderNickname };
            Room.findOneAndUpdate({ _id: room }, { $push: { messages: message } })
            socket.to(room).emit('message', message);
        });

        socket.on('disconnect', () => {
            socket.broadcast.to(room).emit("userdisconnect", ' user has left');
        });
    });
};