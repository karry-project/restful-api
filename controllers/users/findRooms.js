const Room = require('../../models/Room');

module.exports = (req, res) => {
  Room.find({ userId: req.user._id }).then(
    rooms => {
      res.send(rooms);
    },
    err => {
      res.status(400).send({ err });
    }
  );
};
