const Room = require('./../../models/Room');

module.exports = (req, res) => {
    Room.findOneAndDelete({ _id: req.params.id }).then(
		() => {
			res.send(204);
		},
		err => {
			res.status(400).send(err);
		}
	);
};