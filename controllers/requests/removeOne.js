const Request = require('./../../models/Request');

module.exports = (req, res) => {
    Request.findOneAndDelete({ _id: req.params.id }).then(
		() => {
			res.send(204);
		},
		err => {
			res.status(400).send(err);
		}
	);
};