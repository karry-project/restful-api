const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
    const trip = new Trip(req.body)
    trip.save().then(
		() => {
			res.status(201).send(trip);
		},
		err => {
			res.status(400).send(err);
		}
	);
};