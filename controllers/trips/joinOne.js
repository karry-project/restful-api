const Trip = require('./../../models/Trip');
const User = require('./../../models/User');

module.exports = (req, res) => {
    Trip.findOneAndUpdate({
        _id: req.params.id
    }, {
        $push: {
            joinList: req.user.id
        }
    }).then(
        trip => {
            User.findOneAndUpdate({
                _id: req.user.id
            }, {
                $push: {
                    joinedTrips: trip.id
                }
            }).then((user) => {
                res.status(200).send(trip);
            }, err => {
                res.status(400).send(err);
            });
        },
        err => {
            res.status(400).send(err);
        }
    );
};
