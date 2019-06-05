const User = require('./../../models/User');

module.exports = (req, res) => {
	User.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		user => {
			res.status(200).send(user);
		},
		err => {
			res.status(400).send({ err });
		}
	);
};
