const Room = require('./../../models/Room');

module.exports = (req, res) => {
    Room.findOne({ _id: req.params.id }).then(
		room => {
			res.send(room);
		},
		err => {
			res.status(400).send(err);
		}
	);
};