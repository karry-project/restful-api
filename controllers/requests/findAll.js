const Request = require('./../../models/Request');

module.exports = (req, res) => {
    Request.find().then(
		requests => {
			res.status(200).send(requests);
		},
		err => {
			res.status(400).send(err);
		}
	);
};