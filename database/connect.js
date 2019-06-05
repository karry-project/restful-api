const mongoose = require('mongoose');
const keys = require('./../config/keys');

mongoose.Promise = global.Promise;
mongoose.connect(keys.app.databaseUrl, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }).then(
	() => {
		console.log('Successfully connected to database');
	},
	err => {
		console.log('Failed to connect to database', err);
	}
);