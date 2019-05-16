const Review = require('./../../models/Review');

module.exports = (req, res) => {
    Review.findOneAndDelete({ _id: req.params.id }).then(
		() => {
			res.send(204);
		},
		err => {
			res.status(400).send(err);
		}
	);
};