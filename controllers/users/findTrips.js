const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
	Trip.find({ owner: req.params.id }).populate('joinList').then(
		trips => {
			res.send(trips);
		},
		err => {
			res.status(400).send({ err });
		}
	);
};
