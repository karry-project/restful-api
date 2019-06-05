/* eslint-disable no-underscore-dangle */
const Request = require('./../../models/Request');
const Room = require('./../../models/Room');
const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
	const newReequest = new Request(req.body);
	newReequest.save().then(
		request => {
			Trip.findOne({ _id: request.tripId }).then(
				trip => {
					const room = Room({
						userId: req.user._id,
						senderId: trip.owner,
						requestId: request._id,
						messages: []
					});
					room.save().then(
						() => {
							res.status(201).send(request);
						},
						err => {
							res.status(400).send(err);
						});
				},
				(err) => {
					res.status(400).send(err);
				})
		},
		err => {
			res.status(400).send(err);
		}
	);
};