const { User } = require('./models/User');

const auth = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
      return Promise.resolve();
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

module.exports = { auth };
