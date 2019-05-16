const User = require('./../../models/User');

module.exports = (req, res) => {
	User.findOne({ _id: req.params.id }).populate('tripList').then(
		user => {
			res.send(user);
		},
		err => {
			res.status(400).send({ err });
		}
	);
};
