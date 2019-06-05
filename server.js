// Initialization
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// Database
require('./database/connect.js');

// App
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Firebase
require('./lib/notifications').initializeApp();

// Scheduler
require('./lib/scheduler.js');

// Chat
require('./routes/chat')(io);

// Middlewares
require('./middlewares/logger.js')(app);
require('./middlewares/parser.js')(app);
require('./middlewares/cors.js')(app);

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/trips', require('./routes/trips'));
app.use('/rooms', require('./routes/rooms'));
app.use('/reviews', require('./routes/reviews'));
app.use('/requests', require('./routes/requests'));

// Public Ressources
app.use(express.static(`${__dirname}/public`));

module.exports = server;
