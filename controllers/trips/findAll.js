const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
	Trip.find().populate('requestList').populate('owner', '-password', '-tokens').populate('joinList').then(
		trips => {
			res.status(200).send(trips);
		},
		err => {
			res.status(400).send(err);
		}
	);
};
