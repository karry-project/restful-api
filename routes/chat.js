module.exports = io => {

    console.log("launch io setup");

    io.on('connection', (socket) => {
        console.log('user connected');

        // User join chat
        socket.on('join', (data) => {
            console.log(`${data.userNickname} : has joined the chat `);
            socket.broadcast.emit('userjoinedthechat', `${data.userNickname} : has joined the chat `);
        });

        // User send message
        socket.on('sendmessage', (senderNickname, messageContent) => {
            console.log(`${senderNickname} :${messageContent}`);
            const message = {
                "message": messageContent,
                "senderNickname": senderNickname
            };
            socket.broadcast.emit('message', message);
            socket.emit('message', message);
        });

        // User disconnected
        socket.on('disconnect', () => {
            console.log('user has left ');
            socket.broadcast.emit("userdisconnect", ' user has left');
        });
    });
};