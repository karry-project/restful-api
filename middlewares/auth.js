const User = require('./../models/User');
const keys = require('./../config/keys');

const auth = (req, res, next) => {
	const token = req.header('x-auth');
	if (keys.app.acceptedTokens.indexOf(token) > -1) {
		next();
	} else {
		User.findByToken(token)
			.then((user) => {
				if (!user) {
					return Promise.reject();
				}
				req.user = user;
				req.token = token;
				next();
				return true
			})
			.catch(err => {
				res.status(401).send(err);
			});
	}
};

module.exports = auth;
