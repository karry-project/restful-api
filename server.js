const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

const fs = require('fs');
const morgan = require('morgan');
const path = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(
	() => {
		console.log('Successfully connected to database');
	},
	err => {
		console.log('Failed to connect to database', err);
	}
);

const app = express();
const server = http.createServer(app);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(cors());

app.use(function (req, res, next) {
	res.setHeader("Content-Type", "application/json");
	res.setHeader("Access-Control-Allow-Origin", "*");
	next();
});

require('./routes/users')(app);
require('./routes/trips')(app);
require('./routes/requests')(app);

module.exports = server
