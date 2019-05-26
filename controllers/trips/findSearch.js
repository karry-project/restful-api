const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
	const searchObject = req.query;

	Trip.find(searchObject).populate('requestList').populate('owner').populate('joinList').then(
		trips => {
			res.status(200).send(trips);
		},
		err => {
			res.status(400).send(err);
		}
	);
};
