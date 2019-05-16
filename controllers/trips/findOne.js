const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
	Trip.findOne({ _id: req.params.id }).populate('joinList').then(
		trip => {
			res.send(trip);
		},
		err => {
			res.status(400).send(err);
		}
	);
};
