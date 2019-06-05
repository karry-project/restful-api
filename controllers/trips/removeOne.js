const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
    Trip.findOneAndDelete({ _id: req.params.id }).then(
		() => {
			res.send(204);
		},
		err => {
			res.status(400).send(err);
		}
	);
};