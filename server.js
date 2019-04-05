const fs = require('fs');
const path = require('path');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const config = require('./config/config');


// DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(
	() => {
		//console.log('Successfully connected to database');
	},
	err => {
		//console.log('Failed to connect to database', err);
	}
);

// INITIALIZING APP
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }))

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
const corsOptions = {
	exposedHeaders: 'x-auth',
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
	if (!req.url.indexOf("documentation")) {
		res.setHeader("Content-Type", "application/json");
	}
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

const swaggerDefinition = {
	info: {
		title: 'Example Swagger API',
		version: '1.0.0',
		description: 'This is the Example API documentation and is using the OpenAPI spec.',
	},
	host: `localhost:3000`,
	basePath: '/',
};

const swaggerOptions = {
	swaggerDefinition: swaggerDefinition,
	apis: [
		'./routes/users.js',
		'./routes/trips.js',
		'./models/User.js',
	],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./routes/chat')(io);
require('./routes/users')(app);
require('./routes/trips')(app);
require('./routes/requests')(app);

module.exports = server
