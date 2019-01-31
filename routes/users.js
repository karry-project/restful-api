const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');
const { auth } = require('../middlewares/authenticate');

module.exports = app => {
	app.get('/users', (req, res) => {
		User.find().then(
			users => {
				res.status(200).send(users);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.get('/users/me', auth, (req, res) => {
		res.status(200).send(req.user);
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

	app.get('/users/:id/trips', (req, res) => {
		Trip.find({ creator: req.params.id }).then(
			trips => {
				res.send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
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

	app.patch('/users/:id', (req, res) => {
		User.findOneAndUpdate({ _id: req.params.id }, req.body).then(
			user => {
				res.status(200).send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.delete('/users/me/token', auth, (req, res) => {
		req.user.removeToken(req.token).then(
			user => {
				res.status(200).send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	app.delete('/users/:id', auth, (req, res) => {
		User.findOneAndDelete({ _id: req.params.id }).then(
			user => {
				res.send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});
};

/*
{
	"firstname": "test",
	"lastname": "test",
	"email": "test3@gmail.com",
	"password": "testtest"
}

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzUzMTgxMDFhM2ZmMzAwMTc3MzYxYjQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ4OTQ5NTIwfQ.fW9zsKAK20ZFipZl6P0Th_EgJ4wW1dCW3Sc6G4cltcA
5c5318101a3ff300177361b4


*/
