const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');
const { auth } = require('../middlewares/authenticate');
const upload = require('./../config/upload');

const { sendNewUserEmail, sendDeletedUserEmail } = require('./../emails/accounts')

module.exports = app => {

	/**
	 * @swagger
	 * /users:
	 *   get:
	 *     description: Should retrieve a list of all the users
	 *     responses:
	 *       200:
	 *         description: List of users
	 * 		 400:
	 *         description: Error while trying to retrieve the list of users
	 * 		 401:
	 *         description: Please provide a authorization token
	 */
	app.get('/users', auth, (req, res) => {
		User.find().populate('tripList').populate('requestList').then(
			users => {
				res.status(200).send(users);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	/**
	 * @swagger
	 * /users/me:
	 *   get:
	 *     description: Should retrieve informations about the current user
	 *     responses:
	 *       200:
	 *         description: Current user's informations
	 * 		 400:
	 *         description: Error trying to get user's informations
	 * 		 401:
	 *         description: Please provide a authorization token
	 */
	app.get('/users/me', auth, (req, res) => {
		res.status(200).send(req.user);
	})

	/**
	 * @swagger
	 * /users/{id}:
	 *   get:
	 *     description: Should retrieve informations  one user
	 *     responses:
	 *       200:
	 *         description: User's informations
	 * 		 400:
	 *         description: Error trying to reach all data
	 * 		 401:
	 *         description: Please provide a authorization token
	 */
	app.get('/users/:id', auth, (req, res) => {
		User.findOne({ _id: req.params.id }).then(
			user => {
				res.send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	/**
	 * @swagger
	 * /users/{id}/trips:
	 *   get:
	 *     description: Should retrieve all the trips about one user
	 */
	app.get('/users/:id/trips', auth, (req, res) => {
		Trip.find({ creator: req.params.id }).then(
			trips => {
				res.send(trips);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	/**
	 * @swagger
	 * /users/register:
	 *   post:
	 *     description: Should let a user register into the app by returning a token
	 */
	app.post('/users/register', (req, res) => {
		const user = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			phone: req.body.phone,
			password: req.body.password
		});

		user.save()
			.then(() => user.generateAuthToken())
			.then(token => {
				sendNewUserEmail(user.email, user.firstname)
				res.header('x-auth', token)
					.status(201)
					.send(user);
			})
			.catch(err => {
				res.status(400).send(err);
			});
	});

	/**
	 * @swagger
	 * /users/login:
	 *   post:
	 *     description: Should let a user login into the app by returning a token
	 */
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
				res.status(401).send(err);
			});
	});

	/**
	 * @swagger
	 * /users/{id}:
	 *   patch:
	 *     description: Should update informations about a user
	 */
	app.patch('/users/:id', auth, (req, res) => {
		User.findOneAndUpdate({ _id: req.params.id }, req.body).then(
			user => {
				res.status(200).send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});

	/**
	 * @swagger
	 * /users/{id}:
	 *   delete:
	 *     description: Should delete a token of the current user
	 */
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

	/**
	 * @swagger
	 * /users/{id}:
	 *   delete:
	 *     description: Should delete the current user
	 */
	app.delete('/users/:id', auth, (req, res) => {
		User.findOneAndDelete({ _id: req.params.id }).then(
			user => {
				sendDeletedUserEmail(user.email, user.firstname)
				res.send(user);
			},
			err => {
				res.status(400).send(err);
			}
		);
	});
};