const Trip = require('./../../models/Trip');
const User = require('./../../models/User');

module.exports = (req, res) => {
	const trip = new Trip(req.body)
	trip.save().then(
		() => {
			User.findOneAndUpdate({
				_id: req.user.id
			}, {
					$inc: {
						createdTripsCount: 1
					}
				}).then(
					() => {
						res.status(201).send(trip);
					}, err => {
						res.status(400).send(err);
					});
		},
		err => {
			res.status(400).send(err);
		}
	);
};