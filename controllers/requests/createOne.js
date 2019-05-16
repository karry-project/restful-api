const Request = require('./../../models/Request');

module.exports = (req, res) => {
    const request = new Request(req.body);
    request.save().then(
		() => {
			res.status(201).send(request);
		},
		err => {
			res.status(400).send(err);
		}
	);
};