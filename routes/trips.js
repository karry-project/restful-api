const { Trip } = require('./../models/Trip');

module.exports = app => {
	app.get('/trips', (req, res) => {
		Trip.find().then(
			trips => {
				res.status(200).send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/trips/search', (req, res) => {
		Trip.find(req.query).then(
			trips => {
				res.status(200).send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/trips/:id', (req, res) => {
		Trip.findOne({ _id: req.params.id }).then(
			trip => {
				res.send(trip);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.post('/trips', (req, res) => {
		const {
			description,
			destinationCity,
			destinationCountry,
			departureCity,
			departureCountry,
			carryWeight,
			carryMaxAmount,
			carryTaxe,
			creator
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
			creator
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

	app.patch('/trips/:id', (req, res) => {
		Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(
			trip => {
				res.status(201).send(trip);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.delete('/trips/:id', (req, res) => {
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
