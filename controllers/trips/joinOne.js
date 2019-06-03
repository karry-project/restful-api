const Trip = require('./../../models/Trip');
const User = require('./../../models/User');

module.exports = (req, res) => {
    console.log('Trying to join trip')
    Trip.findOneAndUpdate({
        _id: req.params.id
    }, {
            $push: {
                joinList: req.user._id
            }
        }).then(
            trip => {

                console.log('Trying to join trip', trip)
                User.findOneAndUpdate({
                    _id: req.user.id
                }, {
                        $inc: {
                            joinedTripsCount: 1
                        }
                    }).then((user) => {
                        console.log('Trying to join trip')
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
