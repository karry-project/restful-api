const Request = require('./../../models/Request');

module.exports = (req, res) => {
  Request.find({ creator: req.user._id })
    .then(
      requests => {
        res.send(requests);
      },
      err => {
        res.status(400).send({ err });
      }
    );
};
