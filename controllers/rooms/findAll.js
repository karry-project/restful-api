const Room = require('./../../models/Room');

module.exports = (req, res) => {
    Room.find().then(
		rooms => {
			res.status(200).send(rooms);
		},
		err => {
			res.status(400).send(err);
		}
	);
};