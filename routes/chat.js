const Room = require('./../models/Room');

module.exports = io => {
    var room = null;

    io.on('connection', (socket) => {
        socket.on('join', (roomId) => {
            room = roomId
            socket.join(room);
            console.log(`Someone connect to${room}`);
            socket.broadcast.to(room).emit('userjoinedthechat', `Someone : has joined the chat `);
        });

        // User send message
        socket.on('sendmessage', (senderNickname, messageContent) => {
            console.log(`${senderNickname} :${messageContent}`);
            const message = { "message": messageContent, "date": Date.now(), from: senderNickname };
            console.log(message)
            // Find room from roomId and save message
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