const Request = require('./../../models/Request');

module.exports = (req, res) => {
    Request.findOne({ _id: req.params.id }).populate('room').then(
		request => {
			res.send(request);
		},
		err => {
			res.status(400).send(err);
		}
	);
};