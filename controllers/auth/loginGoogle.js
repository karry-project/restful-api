const User = require('./../../models/User');
const { OAuth2Client } = require('google-auth-library');
const keys = require('./../../config/keys');
const client = new OAuth2Client(keys.googleAuth.clientId);

module.exports = (req, res) => {
    const token = req.body.token;
    client.verifyIdToken({
        idToken: token,
        audience: keys.googleAuth.clientId,
    }).then(
        (ticket) => {
            const payload = ticket.getPayload();
            const firstname = payload['given_name'];
            const lastname = payload['family_name'];
            const email = payload['email'];
            const profilePicture = payload['picture'];
            User.findByEmail(email).then(
                (userRetrieved) => {
                    if (userRetrieved === null) {
                        const newUser = User({ firstname, lastname, email, profilePicture });
                        console.log("user is unknown, creating a new one", newUser);
                        newUser.save()
                            .then(() => newUser.generateAuthToken())
                            .then(token => {
                                console.log(newUser);
                                res.header('x-auth', token)
                                    .status(201)
                                    .send(newUser);
                            }).catch(err => {
                                res.status(400).send(err);
                            });
                    }
                    else {
                        console.log("user already exist: generating new auth token" + userRetrieved);
                        userRetrieved.generateAuthToken().then(token => {
                            res.header('x-auth', token)
                                .status(200)
                                .send(userRetrieved);
                        });
                    }
                },
                (err) => {
                    console.log(err);
                });
        },
        (err) => {
            console.log(err);
        }
    );
};
