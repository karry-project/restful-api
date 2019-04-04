module.exports = io => {
    io.on('connection', () => {
        console.log('a user connected to the 7Chill chat server');
    });
};
