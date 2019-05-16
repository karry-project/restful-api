const User = require('./../../models/User');

module.exports = (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
        .then(user =>
            user.generateAuthToken().then(token => {
                res.header('x-auth', token)
                    .status(200)
                    .send(user);
            })
        )
        .catch(err => {
            res.status(401).send({ error: 'Wrong email or password' + err });
        });
};
