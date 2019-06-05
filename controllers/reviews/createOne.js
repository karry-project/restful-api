const Review = require('./../../models/Review');

module.exports = (req, res) => {
    const review = new Review(req.body);
    review.save().then(
		() => {
			res.status(201).send(review);
		},
		err => {
			res.status(400).send(err);
		}
	);
};