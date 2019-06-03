const Trip = require('./../../models/Trip');

module.exports = (req, res) => {
  Trip.find({ owner: req.user._id })
    .populate('owner')
    .populate('joinList')
    .populate('requestList')
    .then(
      trips => {
        res.send(trips);
      },
      err => {
        res.status(400).send({ err });
      }
    );
};
