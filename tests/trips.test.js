const request = require('supertest');
const server = require('./../server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const { User } = require('./../models/User');
const { Trip } = require('./../models/Trip');

const userOneId = new mongoose.Types.ObjectId()
const tripOneId = new mongoose.Types.ObjectId()
const tripTwoId = new mongoose.Types.ObjectId()


const userOne = {
    _id: userOneId,
    firstname: "Maxim",
    lastname: "Toe",
    email: 'maximtoe@example.com',
    phone: "0625875316",
    password: "test_api",
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET)
    }]
}
const tripOne = {
    _id: tripOneId,
    description: "Je suis à Madagascar pour le travail et je peux vous ramener ce que vous désirez",
    departureCity: "Paris",
    departureCountry: "France",
    destinationCity: "Londres",
    destinationCountry: "Angleterre",
    carryWeight: 4,
    carryMaxAmount: 1,
    carryTaxe: 15,
    owner: userOneId
}
const tripTwo = {
    _id: tripTwoId,
    description: "Je suis à Paris et pass vous loool",
    departureCity: "Paris",
    departureCountry: "France",
    destinationCity: "Londres",
    destinationCountry: "Angleterre",
    carryWeight: 4,
    carryMaxAmount: 1,
    carryTaxe: 15,
    owner: userOneId
}

beforeAll(async () => {
    await Trip.deleteMany();
    await new Trip(tripOne).save();
    await new User(userOne).save();
})


// GET /trips
test('Should retrieve all trips', async () => {
    await request(server)
        .get('/trips')
        .set('x-auth', userOne.tokens[0].token)
        .expect('Content-Type', /json/)
        .expect(200);

});

// GET /trips/id
test('Should retrieve one trip', async () => {
    await request(server)
        .get('/trips/' + userOneId)
        .set('x-auth', userOne.tokens[0].token)
        .expect('Content-Type', /json/)
        .expect(200);

});


// GET /trips/search
test('Should retrieve a list of trips', async () => {
    await request(server)
        .get('/trips/search?title="this i"')
        .set('x-auth', userOne.tokens[0].token)
        .expect('Content-Type', /json/)
        .expect(200);

});

// POST /trips
test('Should create a new trip', async () => {
    await request(server)
        .post('/trips')
        .send(tripTwo)
        .set('x-auth', userOne.tokens[0].token)
        .expect('Content-Type', /json/)
        .expect(201);

});

// PATCH /tirps/id
test('Should update a trip description', async () => {
    await request(server)
        .patch('/trips/' + tripOneId)
        .set('x-auth', userOne.tokens[0].token)
        .send({
            "description": "Last description was good but this one seems better ... at least for this test"
        })
        .expect('Content-Type', /json/)
        .expect(200);

});

// GET /trips/id
test('Should retrieve trips own by a user', async () => {
    await request(server)
        .get('/users/' + userOneId + '/trips')
        .set('x-auth', userOne.tokens[0].token)
        .expect('Content-Type', /json/)
        .expect(200);

});

// DELETE /trips/id
test('Should delete a trip', async () => {
    await request(server)
        .delete('/trips/' + tripOneId)
        .set('x-auth', userOne.tokens[0].token)
        //.expect('Content-Type', /json/)
        .expect(204);

    // What is the error message if cant update
    // What is the error message if wrong object id
    // What is the error message if no auth header provided


});