module.exports = (req, res) => {
    req.user.removeToken(req.token).then(
        user => {
            res.status(200).send(user);
        },
        err => {
            res.status(400).send(err);
        });
};
