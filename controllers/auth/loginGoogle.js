/* eslint-disable import/no-extraneous-dependencies */
const { OAuth2Client } = require('google-auth-library');
const User = require('./../../models/User');
const keys = require('./../../config/keys');

const client = new OAuth2Client(keys.googleAuth.clientId);

module.exports = (req, res) => {
    const { token } = req.body;
    client.verifyIdToken({
        idToken: token,
        audience: keys.googleAuth.clientId,
    }).then(
        (ticket) => {
            const payload = ticket.getPayload();
            const firstname = payload.given_name;
            const lastname = payload.family_name;
            const { email } = payload;
            const profilePicture = payload.picture;
            User.findByEmail(email).then(
                (userRetrieved) => {
                    if (userRetrieved === null) {
                        const newUser = User({ firstname, lastname, email, profilePicture });
                        newUser.save()
                            .then(() => newUser.generateAuthToken())
                            .then(newToken => {
                                res.header('x-auth', newToken)
                                    .status(201)
                                    .send(newUser);
                            }).catch(err => {
                                res.status(400).send(err);
                            });
                    } else {
                        userRetrieved.generateAuthToken().then(newToken => {
                            res.header('x-auth', newToken)
                                .status(200)
                                .send(userRetrieved);
                        });
                    }
                },
                (err) => {
                    res.status(400).send(err);
                });
        },
        (err) => {
            res.status(400).send(err);
        }
    );
};
