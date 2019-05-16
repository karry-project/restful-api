const Room = require('./../../models/Room');

module.exports = (req, res) => {
    Room.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		room => {
			res.status(200).send(room);
		},
		err => {
			res.status(400).send(err);
		}
	);
};