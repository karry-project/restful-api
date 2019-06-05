const Review = require('./../../models/Review');

module.exports = (req, res) => {
    Review.findOne({ _id: req.params.id }).then(
		review => {
			res.send(review);
		},
		err => {
			res.status(400).send(err);
		}
	);
};