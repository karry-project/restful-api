const {Trip} = require('./../models/Trip')
const {auth} = require('./../authenticate')

module.exports = function(app){

    // GET ALL
    app.get('/trips', (req, res) => {
        Trip.find().then((trips) => {
            res.status(200).send({trips})
        }, (err) => {
            res.status(400).send({err})
        })
    })

    // GET SEARCH
    app.get('/trips/search', (req, res) => {
        Trip.find(req.query).then((trips) => {
            res.status(200).send({trips})
        }, (err) => {
            res.status(400).send({err})
        })
    })

    // GET ONE
    app.get('/trips/:id', (req, res) => {
        Trip.find({ _id: req.params.id }).then(
            (trip) => {
                res.send({trip})
            }, (err) => {
                res.status(400).send({err})
            }
        )
    })

    

    // POST
    app.post('/trips', (req, res) => {
        const { description, destinationCity, destinationCountry, carryWeight, carryMaxAmount, carryTaxe } = req.body
        const trip = new Trip({ description, destinationCity, destinationCountry, carryWeight, carryMaxAmount, carryTaxe })
        trip.save().then((trip) => {
            res.status(201).send({trip})
        }, (err) => {
            res.status(400).send({err})
        })
    })

    // PATCH
    app.patch('/trips/:id', (req, res) => {
        Trip.findOneAndUpdate({ _id: req.params.id }, req.body).then((trip) => {
            res.status(201).send({trip})
        }, (err) => {
            res.status(400).send({err})
        })
    })

    // DELETE
    app.delete('/trips/:id', (req, res, next) => {
        Trip.findOneAndDelete({ _id: req.params.id }).then(() => {
            res.send(204)
        }, (err) => {
            res.status(400).send({err})
        })
        
    })
}