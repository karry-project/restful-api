const User = require('./../../models/User');

module.exports = (req, res) => {
    const user = req.body;
    User.findByEmail(user.email).then(
        (userRetrieved) => {
            if (userRetrieved === null) {
                const newUser = User(req.body);
                newUser.save()
                    .then(() => newUser.generateAuthToken())
                    .then(token => {
                        res.header('x-auth', token)
                            .status(201)
                            .send(newUser);
                    }).catch(err => {
                        res.status(400).send(err);
                    });
            }
            else {
                userRetrieved.generateAuthToken().then(token => {
                    res.header('x-auth', token)
                        .status(200)
                        .send(userRetrieved);
                });
            }
        },
        (err) => {
            res.status(400).send(err);
        });
};
