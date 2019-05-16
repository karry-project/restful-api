const Review = require('./../../models/Review');

module.exports = (req, res) => {
    Review.findOneAndUpdate({ _id: req.params.id }, req.body).then(
		review => {
			res.status(200).send(review);
		},
		err => {
			res.status(400).send(err);
		}
	);
};