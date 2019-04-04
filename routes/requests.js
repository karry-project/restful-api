const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');
const { Request } = require('./../models/Request');
const { auth } = require('../middlewares/authenticate');
const upload = require('./../config/upload');

module.exports = app => {

    app.post('/requests/:tripId', auth, (req, res) => {
        const request = new Request({
            name: req.body.name,
            weight: req.body.weight,
            message: req.body.message,
            creator: req.body.creator,
            status: "waiting",
            tripId: req.params.tripId
        });

        Trip.find({ _id: req.user.id }).then((trip) => {

            console.log(trip.owner.email)

            request.save().then(
                request => {
                    res.status(201).send(request);
                }
            ).catch(err => {
                res.status(400).send(err);
            });

        }).catch(err => {
            res.status(400).send(err);
        });


    })

    app.get('/requests', auth, (req, res) => {
        Request.find().then(
            requests => {
                res.status(200).send(requests);
            },
            err => {
                res.status(400).send(err);
            }
        );
    });

    app.get('/requests/:id', auth, (req, res) => {
        Request.find({ _id: req.params.id }).then(
            request => {
                res.status(200).send(request);
            },
            err => {
                res.status(400).send(err);
            }
        );
    });

    app.post('requests/:id/accept', auth, (req, res) => {
        Request.findOne({ _id: req.params.id })
        // Io creer une room
    })

    app.delete('/requests/:id', auth, (req, res) => {
        Request.findOneAndDelete({ _id: req.params.id }).then(
            request => {
                res.send(request);
            },
            err => {
                res.status(400).send(err);
            }
        );
    });
}




/*


-> A requets is created
    - Owner of the trip receive a mail

    - Status of the request is set as waiting

    -> Owner of the trip say yes
        - Status of the request is set as accepted
        - Creator of the request join the joinList of the trip
        - A new room is created
            - Creator of the request is added to room
            - Owner of the trip is added to the room

    -> Owner of the trip say no
        - Status of the request is set as denied
            - Creator of the request is notified
            - Request is deleted






*/