const fs = require('fs');
const path = require('path');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation.json');

const config = require('./config/config');


// DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(
	() => {
		console.log('Successfully connected to database');
	},
	err => {
		console.log('Failed to connect to database', err);
	}
);

// INITIALIZING APP
const app = express();
const server = http.createServer(app);

// LOGGING
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }))

// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(function (req, res, next) {
	//res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

require('./routes/users')(app);
require('./routes/trips')(app);
require('./routes/requests')(app);

module.exports = server
