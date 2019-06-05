const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
    Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		trip => {
			res.status(200).send(trip);
		},
		err => {
			res.status(400).send(err);
		}
	);
};