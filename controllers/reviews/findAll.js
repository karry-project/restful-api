const Review = require('./../../models/Review');

module.exports = (req, res) => {
    Review.find().then(
		reviews => {
			res.status(200).send(reviews);
		},
		err => {
			res.status(400).send(err);
		}
	);
};