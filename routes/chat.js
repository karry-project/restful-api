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
            console.log(`${senderNickname} :${messageContent}`);
            const message = { "message": messageContent, "date": Date.now(), from: senderNickname };
            Room.findOneAndUpdate({ _id: room }, { $push: { messages: message } }).then(() => { console.log('message save') }, () => { console.log('erreur') })
            socket.to(room).emit('message', message);
        });

        // User disconnected
        socket.on('disconnect', () => {
            console.log('user has left ');
            socket.broadcast.to(room).emit("userdisconnect", ' user has left');
        });
    });
};