const http = require('http');
const express = require('express');

// Database
require('./database/connect.js');

// App
const app = express();
const server = http.createServer(app);

// Firebase
require('./lib/notifications').initializeApp();

// Scheduler
require('./lib/scheduler.js');

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

app.use(express.static(__dirname + '/public'));

module.exports = server;