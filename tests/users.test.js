const request = require('supertest');
const server = require('./../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()

const userOne = {
	_id: userOneId,
	firstname: "John",
	lastname: "Doe",
	email: 'johndoe@example.com',
	phone: '06060606060',
	password: "test_api",
	tokens: [{
		access: 'auth',
		token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
	}]
};

const userTwo = {
	_id: userTwoId,
	firstname: "Julia",
	lastname: "Lim",
	email: 'julialim@example.com',
	phone: '06060606060',
	password: "test_api",
	tokens: [{
		access: 'auth',
		token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET)
	}]
}
describe('Server', () => {
})
beforeAll(async () => {
	await User.deleteMany()
	await new User(userOne).save()
	await new User(userTwo).save()
})

// GET /users
test('Should retrieve all users', async () => {
	const response = await request(server)
		.get('/users')
		.set('x-auth', userOne.tokens[0].token)
		.expect('Content-Type', /json/)
		.expect(200)


	expect(response.body).not.toBeNull();
	expect(response.body).not.toBeUndefined();
	expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
		firstname: "John",
		lastname: "Doe",
		email: 'johndoe@example.com',
		phone: '06060606060'
	})]));
});

// GET /users/me
test('Should retrieve current user', async () => {
	const response = await request(server)
		.get('/users/me')
		.set('x-auth', userOne.tokens[0].token)
		.expect('Content-Type', /json/)
		.expect(200);

	expect(response.body).not.toBeNull();
	expect(response.body).not.toBeUndefined();
	expect(response.body).toEqual(expect.objectContaining({
		firstname: "John",
		lastname: "Doe",
		email: 'johndoe@example.com',
		phone: '06060606060'
	}));
});
test('Should not retrieve current user without auth', async () => {
	const response = await request(server)
		.get('/users/me')
		.expect('Content-Type', /json/)
		.expect(401);
});

// GET /users/id
test('Should retrieve one user', async () => {
	await request(server)
		.get('/users/' + userOneId)
		.set('x-auth', userOne.tokens[0].token)
		.expect('Content-Type', /json/)
		.expect(200);
});


// POST /users/register
test('Should signup a new user', async () => {
	await request(server)
		.post('/users/register')
		.send({
			firstname: "Thomas",
			lastname: "Oumar",
			email: "oumar.thomas@gmail.com",
			phone: "0625875316",
			password: "test_api"
		})
		.expect('Content-Type', /json/)
		.expect(201);
});

// POST /users/login
test('Should login a user', async () => {
	await request(server)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: userOne.password
		})
		.expect('Content-Type', /json/)
		.expect(200);
});
test('Should not login a user with wrong password', async () => {
	await request(server)
		.post('/users/login')
		.send({
			email: userOne.email,
			password: "this_is_a_wrong_password"
		})
		.expect('Content-Type', /json/)
		.expect(401);
});

// PATCH /users/id
test('Should update a user firstname', async () => {
	await request(server)
		.patch('/users/' + userOneId)
		.set('x-auth', userOne.tokens[0].token)
		.send({
			"firstname": "Paulo"
		})
		.expect('Content-Type', /json/)
		.expect(200);
});

// DELETE /users/id
test('Should delete a user', async () => {
	await request(server)
		.delete('/users/' + userOneId)
		.set('x-auth', userOne.tokens[0].token)
		.expect('Content-Type', /json/)
		.expect(200);

});