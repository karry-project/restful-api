const User = require('./../../models/User');

const { sendDeletedUserEmail } = require('./../../lib/email');

module.exports = (req, res) => {
	User.findOneAndDelete({ _id: req.params.id }).then(
		user => {
			sendDeletedUserEmail(user.email, user.firstname);
			res.status(204).send(user);
		},
		err => {
			res.status(400).send(err);
		}
	);
};