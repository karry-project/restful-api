module.exports = (req, res) => {
    req.user.saveSearch(req.body.destinationCity, req.body.arrivalCity).then(() => {
        res.status(201).send(req.user);
    });
};