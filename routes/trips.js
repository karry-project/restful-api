const { Trip } = require('./../models/Trip');
const { auth } = require('../middlewares/authenticate');

module.exports = app => {
	app.get('/trips', auth, (req, res) => {
		Trip.find().populate('requestList').populate('owner').then(
			trips => {
				res.status(200).send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/trips/search', auth, (req, res) => {
		Trip.find(req.query).then(
			trips => {
				res.status(200).send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/trips/:id', auth, (req, res) => {
		Trip.findOne({ _id: req.params.id }).then(
			trip => {
				res.send(trip);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.post('/trips', auth, (req, res) => {
		const {
			description,
			destinationCity,
			destinationCountry,
			departureCity,
			departureCountry,
			carryWeight,
			carryMaxAmount,
			carryTaxe,
			owner
		} = req.body;
		const trip = new Trip({
			description,
			destinationCity,
			destinationCountry,
			departureCity,
			departureCountry,
			carryWeight,
			carryMaxAmount,
			carryTaxe,
			owner
		});
		trip.save().then(
			() => {
				res.status(201).send(trip);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.patch('/trips/:id', auth, (req, res) => {
		Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(
			trip => {
				res.status(200).send(trip);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.delete('/trips/:id', auth, (req, res) => {
		Trip.findOneAndDelete({ _id: req.params.id }).then(
			() => {
				res.send(204);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});
};
