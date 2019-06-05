const User = require('./../../models/User');

module.exports = (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(() => user.generateAuthToken())
        .then(token => {
            res.header('x-auth', token)
                .status(201)
                .send(user);
        }).catch(err => {
            res.status(400).send(err);
        });
};
