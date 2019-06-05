const Request = require('./../../models/Request');

module.exports = (req, res) => {
    Request.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		request => {
			res.status(200).send(request);
		},
		err => {
			res.status(400).send(err);
		}
	);
};