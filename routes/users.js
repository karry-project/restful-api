const { User } = require('./../models/User');
const { auth } = require('../middlewares/authenticate');

module.exports = app => {
	app.get('/users', (req, res) => {
		User.find().then(
			users => {
				res.status(200).send({ users });
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/users/:id', (req, res) => {
		User.findOne({ _id: req.params.id }).then(
			user => {
				res.send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/users/me', auth, (req, res) => {
		res.status(200).send(req.user);
	});

	app.post('/users', (req, res) => {
		const user = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password
		});

		user.save()
			.then(() => user.generateAuthToken())
			.then(token => {
				res.header('x-auth', token)
					.status(200)
					.send(user);
			})
			.catch(err => {
				res.status(400).send(err);
			});
	});

	app.post('/users/login', (req, res) => {
		User.findByCredentials(req.body.email, req.body.password)
			.then(user =>
				user.generateAuthToken().then(token => {
					res.header('x-auth', token)
						.status(200)
						.send(user);
				})
			)
			.catch(err => {
				res.status(400).send(err);
			});
	});

	app.delete('/users/me/token', (req, res) => {
		req.user.removeToken(req.token).then(
			() => {
				res.status(200);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});
};
