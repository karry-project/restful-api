const Room = require('./../../models/Room');

module.exports = (req, res) => {
    const room = new Room(req.body);
    room.save().then(
		() => {
			res.status(201).send(room);
		},
		err => {
			res.status(400).send(err);
		}
	);
};