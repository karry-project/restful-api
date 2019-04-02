const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');
const { Request } = require('./../models/Request');
const { auth } = require('../middlewares/authenticate');
const upload = require('./../config/upload');

module.exports = app => {

    /* Add a request from user  */
    app.get('/requests', (req, res) => {
        Request.find().populate('requestList').then(
            requests => {
                res.status(200).send(requests);
            },
            err => {
                res.status(400).send(err);
            }
        );
    });

    app.post('/requests/:tripId/submit', (req, res) => {
        const request = new Request({
            name: req.body.name,
            weight: req.body.weight,
            message: req.body.message,
            creator: req.body.creator,
            tripId: req.params.tripId
        });

        request.save().then(
            request => {
                res.status(201).send(request);
            }
        ).catch(err => {
            res.status(400).send(err);
        });
    })

    /* Add accept request from user */
    app.post('requests/:id/accept', auth, (req, res) => {
        Request.findOne({ _id: req.params.id })
    })
    /* Add deny request from user */
}